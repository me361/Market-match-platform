export interface Product {
  id?: string;
  product_name: string;
  description: string | null;
  price: number;
  unit: string | null;
  category: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  image: string | null;
  seller_id?: string;
  created_at?: string;
  updated_at?: string;
  distance?: number | null;
}

export interface Location {
  lat: number;
  lng: number;
  radius: number;
}

export interface SearchFilters {
  query?: string | null;
  category?: string | null;
  location?: {
    lat: number;
    lng: number;
    radius?: number;
  } | null;
  sortBy?: 'price_low' | 'price_high' | 'rating';
  page?: number;
  pageSize?: number;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 