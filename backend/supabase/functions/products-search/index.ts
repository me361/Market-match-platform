// Products Search API
// Handles filtering, sorting, and pagination of products

import { createClient } from 'npm:@supabase/supabase-js@2';

// Define response type
interface Product {
  id: string;
  product_name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  image: string | null;
  seller_id: string;
  created_at: string;
  distance?: number | null;
}

interface ErrorResponse {
  error: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Only handle GET requests
    if (req.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse query parameters
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || null;
    const category = url.searchParams.get('category') || null;
    const lat = url.searchParams.get('lat') ? parseFloat(url.searchParams.get('lat')!) : null;
    const lng = url.searchParams.get('lng') ? parseFloat(url.searchParams.get('lng')!) : null;
    const sortBy = url.searchParams.get('sortBy') || 'relevance';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const radius = url.searchParams.get('radius') ? parseFloat(url.searchParams.get('radius')!) : 50000; // 50km default

    // Validate sort parameter
    const validSortOptions = ['relevance', 'price_low', 'price_high', 'distance', 'rating'];
    if (!validSortOptions.includes(sortBy)) {
      return new Response(
        JSON.stringify({ error: `Invalid sort option. Must be one of: ${validSortOptions.join(', ')}` }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate location parameters
    if ((lat === null && lng !== null) || (lat !== null && lng === null)) {
      return new Response(
        JSON.stringify({ error: 'Both lat and lng must be provided for location-based search' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Call the search_products function
    const { data, error } = await supabaseClient.rpc('search_products', {
      search_query: query,
      category_filter: category,
      lat,
      lng,
      radius,
      sort_by: sortBy,
      page_number: page,
      page_size: pageSize
    });

    if (error) {
      console.error('Database query error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to search products' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Format and return the response
    return new Response(
      JSON.stringify({
        products: data || [],
        page,
        pageSize,
        filters: {
          query,
          category,
          location: lat && lng ? { lat, lng, radius } : null,
          sortBy
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});