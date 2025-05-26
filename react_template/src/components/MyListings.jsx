// src/components/MyListings.jsx
import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('active'); // 'active', 'sold', 'expired'
  
  // Mock data - in a real app, this would come from an API call
  const mockListings = [
    {
      id: 1,
      productName: 'Fresh Tomatoes',
      quantity: '50',
      unit: 'kg',
      price: '120',
      location: 'Kiambu, Kenya',
      postedDate: '2023-04-15',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1592924357228-91b9bb5e3b34?auto=format&fit=crop&q=80&w=1000',
      description: 'Fresh, ripe tomatoes ready for immediate sale. Good quality and organic.',
      views: 45,
      interested: 7
    },
    {
      id: 2,
      productName: 'Maize',
      quantity: '500',
      unit: 'kg',
      price: '40',
      location: 'Nakuru, Kenya',
      postedDate: '2023-04-10',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=1000',
      description: 'Harvested maize, good quality and well-dried.',
      views: 32,
      interested: 3
    },
    {
      id: 3,
      productName: 'Milk',
      quantity: '200',
      unit: 'liters',
      price: '60',
      location: 'Eldoret, Kenya',
      postedDate: '2023-04-05',
      status: 'sold',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=1000',
      description: 'Fresh cow milk available daily. Delivered to your location within the area.',
      views: 65,
      interested: 12
    },
    {
      id: 4,
      productName: 'Potatoes',
      quantity: '300',
      unit: 'kg',
      price: '35',
      location: 'Nyandarua, Kenya',
      postedDate: '2023-03-28',
      status: 'expired',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=1000',
      description: 'Fresh potatoes harvested from the farm. Good size and quality.',
      views: 28,
      interested: 4
    },
  ];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockListings);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleEdit = (id) => {
    setEditingId(id);
    // In a real app, you would redirect to an edit page or open a modal
    console.log(`Edit listing ${id}`);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      // Simulate API call
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setListings(listings.filter(listing => listing.id !== id));
      } catch (error) {
        console.error('Failed to delete listing:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleMarkAsSold = async (id) => {
    // Simulate API call
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setListings(listings.map(listing => 
        listing.id === id ? { ...listing, status: 'sold' } : listing
      ));
    } catch (error) {
      console.error('Failed to update listing status:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    return listing.status === filter;
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'sold': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Produce Listings</h2>
        
        <div className="flex space-x-2">
          <Button 
            size="sm"
            color={filter === 'all' ? 'green' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            size="sm"
            color={filter === 'active' ? 'green' : 'secondary'}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button 
            size="sm"
            color={filter === 'sold' ? 'green' : 'secondary'}
            onClick={() => setFilter('sold')}
          >
            Sold
          </Button>
          <Button 
            size="sm"
            color={filter === 'expired' ? 'green' : 'secondary'}
            onClick={() => setFilter('expired')}
          >
            Expired
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
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No listings found in this category</p>
          <Button
            color="green"
            className="mt-4"
            onClick={() => {}} // This would navigate to the PostProduce component in a real app
          >
            + Add New Listing
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredListings.map(listing => (
            <Card 
              key={listing.id} 
              className="overflow-hidden"
              bordered
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/5 h-36 md:h-auto">
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
                        {listing.location} • Posted on {new Date(listing.postedDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(listing.status)}`}>
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
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
                        {listing.views} views • {listing.interested} interested buyers
                      </p>
                    </div>
                    
                    <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
                      {listing.status === 'active' && (
                        <>
                          <Button
                            size="sm"
                            color="secondary"
                            onClick={() => handleEdit(listing.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            color="blue"
                            onClick={() => handleMarkAsSold(listing.id)}
                          >
                            Mark as Sold
                          </Button>
                        </>
                      )}
                      {listing.status === 'sold' && (
                        <Button
                          size="sm"
                          color="green"
                          onClick={() => {}} // This would open a form to relist with same details
                        >
                          Relist
                        </Button>
                      )}
                      {listing.status === 'expired' && (
                        <Button
                          size="sm"
                          color="green"
                          onClick={() => {}} // This would renew the listing
                        >
                          Renew
                        </Button>
                      )}
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(listing.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
