// src/components/BrowseListings.jsx
import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import ProductCard from './ProductCard';

const BrowseListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredListings, setFilteredListings] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Mock data - in a real app, this would come from an API call
  const mockListings = [
    {
      id: 1,
      productName: 'Fresh Tomatoes',
      category: 'Vegetables',
      quantity: '200',
      unit: 'kg',
      price: '120',
      location: 'Kiambu, Kenya',
      distance: 8.3,
      postedBy: 'John Mwangi',
      postedDate: '2023-04-15',
      image: 'https://images.unsplash.com/photo-1592924357228-91b9bb5e3b34?auto=format&fit=crop&q=80&w=1000',
      description: 'Fresh, ripe tomatoes ready for immediate sale. Good quality and organic.',
    },
    {
      id: 2,
      productName: 'Maize',
      category: 'Cereals',
      quantity: '1000',
      unit: 'kg',
      price: '45',
      location: 'Nakuru, Kenya',
      distance: 23.7,
      postedBy: 'Sarah Kamau',
      postedDate: '2023-04-14',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=1000',
      description: 'Harvested maize, good quality and well-dried. Available in bulk.',
    },
    {
      id: 3,
      productName: 'Fresh Milk',
      category: 'Dairy',
      quantity: '200',
      unit: 'liters',
      price: '60',
      location: 'Eldoret, Kenya',
      distance: 45.1,
      postedBy: 'David Kiprop',
      postedDate: '2023-04-15',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=1000',
      description: 'Fresh cow milk available daily. Can deliver to nearby locations.',
    },
    {
      id: 4,
      productName: 'Irish Potatoes',
      category: 'Vegetables',
      quantity: '500',
      unit: 'kg',
      price: '35',
      location: 'Nyandarua, Kenya',
      distance: 17.2,
      postedBy: 'James Wachira',
      postedDate: '2023-04-13',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=1000',
      description: 'Fresh potatoes harvested from the farm. Good size and quality.',
    },
    {
      id: 5,
      productName: 'Bananas',
      category: 'Fruits',
      quantity: '100',
      unit: 'kg',
      price: '80',
      location: 'Mombasa, Kenya',
      distance: 67.5,
      postedBy: 'Amina Hassan',
      postedDate: '2023-04-12',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=1000',
      description: 'Sweet ripe bananas ready for the market. Good quality.',
    },
    {
      id: 6,
      productName: 'Fresh Eggs',
      category: 'Poultry',
      quantity: '500',
      unit: 'pieces',
      price: '15',
      location: 'Thika, Kenya',
      distance: 12.8,
      postedBy: 'Peter Njoroge',
      postedDate: '2023-04-15',
      image: 'https://images.unsplash.com/photo-1583645870248-bdc947232725?auto=format&fit=crop&q=80&w=1000',
      description: 'Farm fresh eggs from free-range hens. Available daily.',
    },
  ];

  const categories = ['all', 'Vegetables', 'Fruits', 'Cereals', 'Dairy', 'Poultry', 'Meat', 'Fish'];
  const regions = ['all', 'Nairobi', 'Kiambu', 'Mombasa', 'Nakuru', 'Eldoret', 'Thika', 'Nyandarua'];
  const sortOptions = [
    { value: 'date', label: 'Most Recent' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'distance', label: 'Nearest to Me' },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockListings);
      setFilteredListings(mockListings);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...listings];

    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(listing => listing.category === filterCategory);
    }

    // Apply region filter
    if (filterRegion !== 'all') {
      result = result.filter(listing => listing.location.includes(filterRegion));
    }

    // Apply price range filter
    if (priceRange.min) {
      result = result.filter(listing => parseFloat(listing.price) >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(listing => parseFloat(listing.price) <= parseFloat(priceRange.max));
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        result = result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'price_low':
        result = result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_high':
        result = result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'distance':
        result = result.sort((a, b) => a.distance - b.distance);
        break;
      default:
        break;
    }

    setFilteredListings(result);
  }, [listings, filterCategory, filterRegion, priceRange, sortBy]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSeller = (listing) => {
    // In a real app, this would open a messaging interface or show contact details
    console.log(`Contacting seller for ${listing.productName}`);
    alert(`Contact ${listing.postedBy} about ${listing.productName}. In a real app, this would open chat or show contact info.`);
  };

  const resetFilters = () => {
    setFilterCategory('all');
    setFilterRegion('all');
    setPriceRange({ min: '', max: '' });
    setSortBy('date');
  };

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredListings.map(listing => (
        <Card key={listing.id} className="overflow-hidden h-full flex flex-col">
          <div className="h-40 overflow-hidden">
            <img 
              src={listing.image}
              alt={listing.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div>
              <h3 className="font-semibold text-lg">{listing.productName}</h3>
              <p className="text-green-700 dark:text-green-500 font-bold">
                {listing.price} KES/{listing.unit}
              </p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {listing.quantity} {listing.unit} available
                </p>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                  {listing.category}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {listing.location} • {listing.distance.toFixed(1)} km
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Posted on {new Date(listing.postedDate).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 mt-auto">
              <Button
                onClick={() => handleContactSeller(listing)}
                color="blue"
                fullWidth
              >
                Contact Seller
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredListings.map(listing => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/4 h-40 sm:h-auto">
              <img 
                src={listing.image}
                alt={listing.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{listing.productName}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {listing.location} • {listing.distance.toFixed(1)} km away
                  </p>
                </div>
                <div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {listing.category}
                  </span>
                </div>
              </div>
              
              <div className="mt-2 md:flex justify-between items-center">
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-500">
                    {listing.price} KES/{listing.unit}
                  </p>
                  <p className="text-sm">Quantity: {listing.quantity} {listing.unit}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Posted by {listing.postedBy} on {new Date(listing.postedDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="mt-3 md:mt-0">
                  <Button
                    onClick={() => handleContactSeller(listing)}
                    color="blue"
                  >
                    Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Browse Produce Listings</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredListings.length} listings available
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            color={viewMode === 'grid' ? 'blue' : 'secondary'}
            onClick={() => setViewMode('grid')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </Button>
          <Button 
            size="sm" 
            color={viewMode === 'list' ? 'blue' : 'secondary'}
            onClick={() => setViewMode('list')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Locations' : region}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price Range (KES)
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="mb-0"
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Max"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="mb-0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button
            size="sm"
            color="secondary"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No listings found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filters to find what you're looking for.</p>
          <Button
            color="blue"
            className="mt-4"
            onClick={resetFilters}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div>
          {viewMode === 'grid' ? <GridView /> : <ListView />}
        </div>
      )}
    </div>
  );
};

export default BrowseListings;