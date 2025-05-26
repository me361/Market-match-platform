import React, { useState, useEffect } from 'react';
import { productApi, type Product, type SearchFilters } from '../lib/supabase';
import { Search, MapPin, Tag, SortAsc } from 'lucide-react';

const ProductSearchDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: null,
    location: null,
    sortBy: 'relevance',
    page: 1,
    pageSize: 10
  });

  // Categories for demo
  const categories = [
    'Electronics',
    'Clothing',
    'Food',
    'Home',
    'Beauty',
    'Sports',
    'Books',
    'Toys'
  ];

  // Sort options
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'distance', label: 'Distance' }
  ];

  // Load products based on filters
  const searchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productApi.searchProducts(filters);
      setProducts(response.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading products');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts();
  };

  // Use location
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFilters({
            ...filters,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              radius: 50000 // 50km default
            }
          });
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  // Clear location
  const handleClearLocation = () => {
    setFilters({
      ...filters,
      location: null
    });
  };

  // Demo effect to show some sample data on mount
  useEffect(() => {
    searchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Search API Demo</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Query */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="query"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search for products..."
                value={filters.query || ''}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="category"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value || null })}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Sort Options */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SortAsc className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="sortBy"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.sortBy}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  sortBy: e.target.value as 'relevance' | 'price_low' | 'price_high' | 'distance' | 'rating'
                })}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Location Controls */}
        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">Location:</span>
          </div>
          
          {filters.location ? (
            <div className="ml-2 flex items-center">
              <span className="text-sm text-gray-600">
                Lat: {filters.location.lat.toFixed(4)}, Lng: {filters.location.lng.toFixed(4)}
              </span>
              <button
                type="button"
                className="ml-2 text-sm text-red-600 hover:text-red-800"
                onClick={handleClearLocation}
              >
                Clear
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="ml-2 text-sm text-indigo-600 hover:text-indigo-800"
              onClick={handleUseLocation}
            >
              Use My Location
            </button>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search Products
          </button>
        </div>
      </form>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      )}
      
      {/* Results */}
      {!loading && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            {products.length} {products.length === 1 ? 'Result' : 'Results'}
          </h2>
          
          {products.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No products found. Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="h-48 bg-gray-200 relative">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.product_name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    {product.category && (
                      <span className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {product.category}
                      </span>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 truncate">{product.product_name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                        {product.unit && <span className="text-xs text-gray-500 ml-1">/{product.unit}</span>}
                      </span>
                      
                      {product.rating && (
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Location and Distance */}
                    {(product.location || product.distance) && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="truncate">
                          {product.location}
                          {product.distance && ` (${(product.distance / 1000).toFixed(1)} km)`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {products.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button
                  className="px-3 py-1 rounded-md mr-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  disabled={filters.page === 1}
                  onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {filters.page} 
                </span>
                <button
                  className="px-3 py-1 rounded-md ml-2 bg-gray-100 hover:bg-gray-200"
                  onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductSearchDemo;