/*
  # Product Search API Schema

  1. Extensions
     - Add pgcrypto for UUID generation
     - Add earthdistance for location-based queries

  2. New Tables
     - `products` - Main products table with all required fields
       - `id` (uuid, primary key)
       - `product_name` (text)
       - `description` (text)
       - `price` (numeric)
       - `unit` (text)
       - `category` (text)
       - `location` (text)
       - `latitude` (float)
       - `longitude` (float)
       - `rating` (numeric)
       - `image` (text)
       - `seller_id` (uuid)
       - `created_at` (timestamptz)
       - `updated_at` (timestamptz)

  3. Indexes
     - GIN index on product_name and description for text search
     - Index on category for filtering
     - Index on price for sorting
     - Index on rating for sorting
     - GIST index on lat/lng for geospatial queries

  4. Security
     - Enable RLS on products table
     - Add policy for authenticated users to read all products
     - Add policy for authenticated users to manage their own products
*/

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enable earthdistance for location-based queries
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  unit TEXT,
  category TEXT,
  location TEXT,
  latitude FLOAT,
  longitude FLOAT,
  rating NUMERIC(3, 2) CHECK (rating >= 0 AND rating <= 5),
  image TEXT,
  seller_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for search performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);

-- Create GIN index for full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_products_text_search ON products 
USING GIN ((product_name || ' ' || COALESCE(description, '')) gin_trgm_ops);

-- Create spatial index for location queries
CREATE INDEX IF NOT EXISTS idx_products_location ON products USING GIST (ll_to_earth(latitude, longitude));

-- Function to update timestamp on record update
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp
CREATE TRIGGER update_products_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);

-- Policy: Users can insert their own products
CREATE POLICY "Users can insert their own products"
  ON products
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

-- Policy: Users can update their own products
CREATE POLICY "Users can update their own products"
  ON products
  FOR UPDATE
  USING (auth.uid() = seller_id);

-- Policy: Users can delete their own products
CREATE POLICY "Users can delete their own products"
  ON products
  FOR DELETE
  USING (auth.uid() = seller_id);

-- Function to search products with various filters
CREATE OR REPLACE FUNCTION search_products(
  search_query TEXT DEFAULT NULL,
  category_filter TEXT DEFAULT NULL,
  lat FLOAT DEFAULT NULL,
  lng FLOAT DEFAULT NULL,
  radius FLOAT DEFAULT 50000, -- default 50km radius
  sort_by TEXT DEFAULT 'relevance',
  page_number INTEGER DEFAULT 1,
  page_size INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  product_name TEXT,
  description TEXT,
  price NUMERIC,
  unit TEXT,
  category TEXT,
  location TEXT,
  latitude FLOAT,
  longitude FLOAT,
  rating NUMERIC,
  image TEXT,
  seller_id UUID,
  created_at TIMESTAMPTZ,
  distance FLOAT
) AS $$
DECLARE
  offset_val INTEGER := (page_number - 1) * page_size;
BEGIN
  RETURN QUERY
  WITH results AS (
    SELECT 
      p.*,
      CASE 
        WHEN lat IS NOT NULL AND lng IS NOT NULL AND p.latitude IS NOT NULL AND p.longitude IS NOT NULL THEN
          earth_distance(ll_to_earth(lat, lng), ll_to_earth(p.latitude, p.longitude))
        ELSE NULL
      END AS distance,
      CASE
        WHEN search_query IS NOT NULL THEN
          similarity(p.product_name || ' ' || COALESCE(p.description, ''), search_query)
        ELSE 1.0
      END AS relevance_score
    FROM products p
    WHERE 
      (search_query IS NULL OR 
        (p.product_name ILIKE '%' || search_query || '%' OR 
         COALESCE(p.description, '') ILIKE '%' || search_query || '%'))
      AND (category_filter IS NULL OR p.category = category_filter)
      AND (
        lat IS NULL OR 
        lng IS NULL OR 
        p.latitude IS NULL OR 
        p.longitude IS NULL OR
        earth_distance(ll_to_earth(lat, lng), ll_to_earth(p.latitude, p.longitude)) <= radius
      )
  )
  SELECT 
    r.id,
    r.product_name,
    r.description,
    r.price,
    r.unit,
    r.category,
    r.location,
    r.latitude,
    r.longitude,
    r.rating,
    r.image,
    r.seller_id,
    r.created_at,
    r.distance
  FROM results r
  ORDER BY
    CASE WHEN sort_by = 'relevance' THEN r.relevance_score END DESC,
    CASE WHEN sort_by = 'price_low' THEN r.price END ASC,
    CASE WHEN sort_by = 'price_high' THEN r.price END DESC,
    CASE WHEN sort_by = 'distance' AND lat IS NOT NULL AND lng IS NOT NULL THEN r.distance END ASC,
    CASE WHEN sort_by = 'rating' THEN r.rating END DESC,
    r.created_at DESC
  LIMIT page_size
  OFFSET offset_val;
END;
$$ LANGUAGE plpgsql;