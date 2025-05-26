import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Types
interface SearchRequestBody {
  query?: string;
  category?: string;
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  sortBy?: 'price_low' | 'price_high' | 'rating' | 'relevance';
  page?: number;
  pageSize?: number;
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating?: number;
  image_url?: string;
}

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
};

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.get('/api/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get('/api/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.post('/api/products', async (req: Request<{}, {}, Product>, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

app.put('/api/products/:id', async (req: Request<{ id: string }, {}, Partial<Product>>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.post('/api/products/search', async (req: Request<{}, {}, SearchRequestBody>, res: Response, next: NextFunction) => {
  try {
    const { query, category, location, sortBy, page = 1, pageSize = 10 } = req.body;
    let supabaseQuery = supabase.from('products').select('*', { count: 'exact' });

    // Apply filters
    if (query) {
      supabaseQuery = supabaseQuery.textSearch('name', query);
    }

    if (category) {
      supabaseQuery = supabaseQuery.eq('category', category);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        supabaseQuery = supabaseQuery.order('price', { ascending: true });
        break;
      case 'price_high':
        supabaseQuery = supabaseQuery.order('price', { ascending: false });
        break;
      case 'rating':
        supabaseQuery = supabaseQuery.order('rating', { ascending: false });
        break;
      default:
        // Default sorting by relevance (if full-text search is used)
        break;
    }

    // Apply pagination
    const start = (page - 1) * pageSize;
    supabaseQuery = supabaseQuery.range(start, start + pageSize - 1);

    const { data, error, count } = await supabaseQuery;

    if (error) throw error;

    res.json({
      products: data,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize)
    });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware should be last
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
}); 