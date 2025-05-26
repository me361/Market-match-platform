# Supabase Product Search API

This project implements a Supabase backend API for a product search system with advanced filtering, sorting, and CRUD operations.

## Features

- Complete product database with relevant fields
- Advanced search API with text, category, and location filtering
- Multiple sorting options (relevance, price, distance, rating)
- Full CRUD API for product management
- Row Level Security (RLS) for proper data protection
- Optimized PostgreSQL functions for location-based queries

## Getting Started

### Prerequisites

- Supabase project
- Supabase CLI (optional, for local development)

### Setup

1. Connect to Supabase by clicking the "Connect to Supabase" button in the StackBlitz interface
2. The migrations will create the necessary database schema
3. The Edge Functions will be deployed automatically

## API Endpoints

### Search Products

```
GET /functions/v1/products-search
```

Query Parameters:
- `query`: Text to search in product name and description
- `category`: Filter by category
- `lat`, `lng`: Coordinates for location-based search
- `radius`: Search radius in meters (default: 50000)
- `sortBy`: Sorting method (relevance, price_low, price_high, distance, rating)
- `page`, `pageSize`: Pagination controls

Example:
```
/functions/v1/products-search?query=coffee&category=beverages&lat=37.7749&lng=-122.4194&sortBy=distance&page=1&pageSize=20
```

### CRUD Operations

**Create Product**
```
POST /functions/v1/products-crud
```

**Get Product**
```
GET /functions/v1/products-crud/:id
```

**Update Product**
```
PUT /functions/v1/products-crud/:id
```

**Delete Product**
```
DELETE /functions/v1/products-crud/:id
```

**List Products**
```
GET /functions/v1/products-crud?page=1&pageSize=20&sellerId=optional
```

## Client Library

The project includes a TypeScript client library in `src/lib/supabase.ts` that provides a convenient API for interacting with the Supabase backend.

Example usage:

```typescript
import { productApi } from './lib/supabase';

// Search products
const results = await productApi.searchProducts({
  query: 'coffee',
  category: 'beverages',
  location: { lat: 37.7749, lng: -122.4194 },
  sortBy: 'distance',
  page: 1,
  pageSize: 20
});

// Create a product
const newProduct = await productApi.createProduct({
  product_name: 'Organic Coffee',
  description: 'Freshly roasted organic coffee beans',
  price: 12.99,
  unit: 'lb',
  category: 'beverages',
  location: 'San Francisco, CA',
  latitude: 37.7749,
  longitude: -122.4194,
  rating: 4.5,
  image: 'https://example.com/coffee.jpg'
});
```

## Security

The API enforces the following security rules:
- Anyone can read products
- Only authenticated users can create products
- Users can only update/delete their own products

## Performance

The database includes optimized indexes for:
- Text search using PostgreSQL's trigram extension
- Category filtering
- Price and rating sorting
- Location-based queries using earthdistance

## Type Safety

The project includes TypeScript type definitions for the database schema and API responses to ensure type safety in your frontend code.