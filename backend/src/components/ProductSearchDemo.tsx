import React, { useState, useEffect } from 'react';
import { productApi } from '../lib/supabase';
import type { Product, SearchFilters } from '../types';
import { Search, MapPin, Tag, SortAsc } from 'lucide-react';

const ProductSearchDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    page: 1,
    pageSize: 10
  });

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.search(filters);
      setProducts(response.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Product Search</h1>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={filters.query || ''}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              />
            </div>
          </div>
          
          <div className="w-48">
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none"
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
              </select>
            </div>
          </div>
          
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearchDemo; 