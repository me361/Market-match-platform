import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types.js';
import type { Product, SearchFilters } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Product API service
export const productApi = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    return data as Product[];
  },

  async search(filters: SearchFilters) {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    if (filters.query) {
      query = query.textSearch('product_name', filters.query);
    }

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
      }
    }

    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const start = (page - 1) * pageSize;
    
    query = query.range(start, start + pageSize - 1);

    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return {
      products: data as Product[],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
  },
  
  async getProduct(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Product;
  },
  
  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data as Product;
  },
  
  async updateProduct(id: string, product: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Product;
  },
  
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
  
  async listProducts(page = 1, pageSize = 20, sellerId?: string) {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });
    
    if (sellerId) {
      query = query.eq('seller_id', sellerId);
    }
    
    const start = (page - 1) * pageSize;
    query = query.range(start, start + pageSize - 1);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return {
      products: data as Product[],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    };
  }
};