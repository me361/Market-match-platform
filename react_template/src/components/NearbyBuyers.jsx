// src/components/NearbyBuyers.jsx
import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';

const NearbyBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [productFilter, setProductFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [showMap, setShowMap] = useState(false);
  
  // Mock data - in a real app, this would come from an API call
  const mockBuyers = [
    {
      id: 1,
      name: 'Nairobi Fresh Market',
      type: 'Wholesaler',
      products: ['Tomatoes', 'Onions', 'Peppers', 'Carrots'],
      location: 'Nairobi CBD',
      distance: 5.2,
      rating: 4.8,
      contactNumber: '+254712345678',
      email: 'info@nairobifresh.co.ke',
      recentActivity: '2 days ago',
      buyingFrequency: 'Weekly',
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      name: 'Green Grocers Ltd',
      type: 'Retailer',
      products: ['Tomatoes', 'Potatoes', 'Bananas'],
      location: 'Westlands, Nairobi',
      distance: 8.7,
      rating: 4.5,
      contactNumber: '+254723456789',
      email: 'orders@greengrocers.co.ke',
      recentActivity: '5 days ago',
      buyingFrequency: 'Weekly',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      name: 'Farm to Table Co',
      type: 'Restaurant',
      products: ['Tomatoes', 'Herbs', 'Specialty Vegetables'],
      location: 'Karen, Nairobi',
      distance: 12.4,
      rating: 4.9,
      contactNumber: '+254734567890',
      email: 'chef@farmtotableco.com',
      recentActivity: '1 day ago',
      buyingFrequency: 'Daily',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 4,
      name: 'Nakumatt Supermarket',
      type: 'Supermarket',
      products: ['Maize', 'Beans', 'Rice', 'Potatoes'],
      location: 'Thika Road, Nairobi',
      distance: 15.8,
      rating: 4.3,
      contactNumber: '+254745678901',
      email: 'procurement@nakumatt.co.ke',
      recentActivity: '3 days ago',
      buyingFrequency: 'Bi-weekly',
      image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 5,
      name: 'Eldoret Farmers Market',
      type: 'Market',
      products: ['Maize', 'Milk', 'Potatoes'],
      location: 'Eldoret Town',
      distance: 35.2,
      rating: 4.6,
      contactNumber: '+254756789012',
      email: 'info@eldoretmarket.co.ke',
      recentActivity: '1 week ago',
      buyingFrequency: 'Monthly',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400'
    },
  ];
  
  // Product categories for filtering
  const productCategories = [
    'all', 'Tomatoes', 'Maize', 'Potatoes', 'Onions', 'Milk', 'Beans', 'Rice', 'Peppers', 'Carrots', 'Bananas', 'Herbs'
  ];
  
  // Distance options for filtering
  const distanceOptions = [
    { value: 'all', label: 'Any Distance' },
    { value: '10', label: 'Within 10 km' },
    { value: '20', label: 'Within 20 km' },
    { value: '50', label: 'Within 50 km' },
  ];
  
  // Buyer types for filtering
  const buyerTypes = ['Wholesaler', 'Retailer', 'Restaurant', 'Supermarket', 'Market'];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBuyers(mockBuyers);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredBuyers = buyers.filter(buyer => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      buyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Product filter
    const matchesProduct = productFilter === 'all' || 
      buyer.products.includes(productFilter);
    
    // Distance filter
    const matchesDistance = distanceFilter === 'all' || 
      buyer.distance <= parseInt(distanceFilter);
    
    return matchesSearch && matchesProduct && matchesDistance;
  });
  
  const handleContactBuyer = (buyer) => {
    // In a real app, this could open a messaging interface or show contact details
    console.log(`Contacting ${buyer.name}`);
    // For demo, let's alert
    alert(`Contact ${buyer.name} at ${buyer.contactNumber} or ${buyer.email}`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Nearby Buyers</h2>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="md:w-1/2">
            <Input
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-0"
            />
          </div>
          
          <div className="md:w-1/4">
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
            >
              {productCategories.map((product) => (
                <option key={product} value={product}>
                  {product === 'all' ? 'All Products' : product}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:w-1/4">
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
            >
              {distanceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            size="sm"
            color="secondary"
            onClick={() => {
              setSearchTerm('');
              setProductFilter('all');
              setDistanceFilter('all');
            }}
          >
            Reset Filters
          </Button>
          
          <Button
            size="sm"
            color={showMap ? 'green' : 'secondary'}
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? 'Hide Map View' : 'Show Map View'}
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredBuyers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No buyers found with the current filters</p>
        </div>
      ) : showMap ? (
        <div className="relative h-96 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
          {/* This would be replaced with an actual map component in a real application */}
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Map View</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              (In a real application, this would show an interactive map with buyer locations)
            </p>
            {filteredBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="absolute w-3 h-3 bg-green-500 rounded-full"
                style={{
                  // Randomly position the dots for demo
                  left: `${30 + Math.random() * 40}%`, 
                  top: `${20 + Math.random() * 60}%`,
                }}
              >
                <div className="group relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 hidden group-hover:block bg-white dark:bg-gray-800 p-2 rounded shadow-lg z-10 w-48">
                    <p className="font-medium text-sm">{buyer.name}</p>
                    <p className="text-xs">{buyer.distance.toFixed(1)} km away</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBuyers.map((buyer) => (
            <Card key={buyer.id} className="flex flex-col overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={buyer.image} 
                    alt={buyer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{buyer.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {buyer.type} • {buyer.distance.toFixed(1)} km away
                      </p>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm">{buyer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Buys: {buyer.products.join(', ')}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Active: {buyer.recentActivity} • Frequency: {buyer.buyingFrequency}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 pt-0 mt-auto">
                <Button
                  onClick={() => handleContactBuyer(buyer)}
                  color="green"
                  fullWidth
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Buyer
                  </div>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-6">
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-500">Buyer Information</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                These are potential buyers near your location. Contacting them directly allows you to negotiate better prices and establish long-term business relationships. Make sure your produce meets their quality standards.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NearbyBuyers;