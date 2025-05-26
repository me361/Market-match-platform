// Products CRUD API
// Handles Create, Read, Update, Delete operations for products

import { createClient } from 'npm:@supabase/supabase-js@2';

interface Product {
  id?: string;
  product_name: string;
  description?: string;
  price: number;
  unit?: string;
  category?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
  rating?: number | null;
  image?: string | null;
  seller_id?: string;
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
    
    // Get user ID from auth
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const productId = pathParts[pathParts.length - 1] !== 'products-crud' ? pathParts[pathParts.length - 1] : null;

    // CREATE - POST /products-crud
    if (req.method === 'POST' && !productId) {
      const productData: Product = await req.json();
      
      // Validate required fields
      if (!productData.product_name || productData.price === undefined) {
        return new Response(
          JSON.stringify({ error: 'product_name and price are required' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // Set seller_id to the authenticated user
      productData.seller_id = user.id;

      const { data, error } = await supabaseClient
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // READ - GET /products-crud/:id
    if (req.method === 'GET' && productId) {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Product not found' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // UPDATE - PUT /products-crud/:id
    if (req.method === 'PUT' && productId) {
      const productData: Product = await req.json();

      // Check if the product exists and belongs to the user
      const { data: existingProduct, error: findError } = await supabaseClient
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('seller_id', user.id)
        .single();

      if (findError) {
        return new Response(
          JSON.stringify({ error: 'Product not found or you do not have permission to update it' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // Update the product
      const { data, error } = await supabaseClient
        .from('products')
        .update(productData)
        .eq('id', productId)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // DELETE - DELETE /products-crud/:id
    if (req.method === 'DELETE' && productId) {
      // Check if the product exists and belongs to the user
      const { data: existingProduct, error: findError } = await supabaseClient
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('seller_id', user.id)
        .single();

      if (findError) {
        return new Response(
          JSON.stringify({ error: 'Product not found or you do not have permission to delete it' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // Delete the product
      const { error } = await supabaseClient
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Product deleted successfully' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // LIST ALL - GET /products-crud
    if (req.method === 'GET' && !productId) {
      // Get pagination parameters
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
      const offset = (page - 1) * pageSize;
      
      // Optional seller filter
      const sellerId = url.searchParams.get('sellerId');
      
      let query = supabaseClient
        .from('products')
        .select('*', { count: 'exact' });
        
      // Add seller filter if provided
      if (sellerId) {
        query = query.eq('seller_id', sellerId);
      }
      
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify({
          products: data || [],
          pagination: {
            page,
            pageSize,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / pageSize)
          }
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // If we reach here, the endpoint doesn't exist
    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      {
        status: 404,
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