import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import MessageDialog from './MessageDialog';
import { products, location } from '../services/api';
import { supabase } from '../supabaseClient';
console.log('location object:', location);

const ProductCard = ({ product, onContactSeller }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <img 
      src={product.image} 
      alt={product.productName}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.productName}</h3>
        <span className="text-green-600 dark:text-green-400 font-bold">
          KSh {product.price}/{product.unit}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.description}</p>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <FaMapMarkerAlt className="mr-1" />
        <span>{product.location} ({product.distance.toFixed(1)} km)</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
        </div>
        <button 
          onClick={() => onContactSeller(product)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Contact Seller
        </button>
      </div>
    </div>
  </div>
);

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const categories = [
    'all',
    'vegetables',
    'fruits',
    'grains',
    'dairy',
    'meat',
    'poultry',
    'other'
  ];

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } else {
        console.log('Products:', data);
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCoordinates(coords);
          
          try {
            // Convert coordinates to address
            const address = await location.reverseGeocode(coords);
            setLocationInput(address.formatted_address);
          } catch (error) {
            console.error('Error getting location:', error);
            setLocationInput('');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationInput('');
        }
      );
    }
  }, []);

  const searchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      let searchCoordinates = coordinates;

      // If user entered a location, geocode it
      if (locationInput && (!coordinates || locationInput !== 'Current Location')) {
        try {
          const geocoded = await location.geocode(locationInput);
          searchCoordinates = {
            lat: geocoded.lat,
            lng: geocoded.lng
          };
        } catch (error) {
          console.error('Error geocoding location:', error);
        }
      }

      // Search products
      const searchParams = {
        query: searchTerm,
        category: category !== 'all' ? category : undefined,
        sortBy,
        ...(searchCoordinates && {
          lat: searchCoordinates.lat,
          lng: searchCoordinates.lng
        })
      };

      const result = await products.search(searchParams);
      setProducts(result);
    } catch (error) {
      console.error('Error searching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts();
  };

  const handleContactSeller = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Search Products</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Location Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter location..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Section */}
        <div className="mt-8">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onContactSeller={handleContactSeller}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No products found. Try adjusting your search criteria.
            </p>
          )}
        </div>
      </div>

      {/* Message Dialog */}
      {selectedProduct && (
        <MessageDialog
          product={selectedProduct}
          seller={selectedProduct.seller}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default SearchProducts;
