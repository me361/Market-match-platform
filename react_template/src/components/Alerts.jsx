import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    condition: 'above', // above or below
    price: '',
    region: 'any',
    notifyVia: ['email', 'app'],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in a real app, this would come from an API call
  const mockAlerts = [
    {
      id: 1,
      product: 'Maize',
      condition: 'above',
      price: '60',
      region: 'Nairobi',
      notifyVia: ['email', 'app'],
      createdAt: '2023-04-01T10:30:00',
      active: true,
    },
    {
      id: 2,
      product: 'Tomatoes',
      condition: 'below',
      price: '90',
      region: 'any',
      notifyVia: ['app'],
      createdAt: '2023-03-25T14:15:00',
      active: true,
    },
    {
      id: 3,
      product: 'Potatoes',
      condition: 'above',
      price: '45',
      region: 'Nakuru',
      notifyVia: ['email'],
      createdAt: '2023-03-20T09:45:00',
      active: false,
    },
  ];

  // Product options for selection
  const productOptions = [
    'Maize', 'Rice', 'Beans', 'Tomatoes', 'Potatoes', 'Onions', 'Carrots', 
    'Cabbage', 'Bananas', 'Milk', 'Eggs'
  ];

  // Region options for selection
  const regionOptions = [
    'any', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updatedNotifyVia = [...formData.notifyVia];
      if (checked) {
        if (!updatedNotifyVia.includes(value)) {
          updatedNotifyVia.push(value);
        }
      } else {
        const index = updatedNotifyVia.indexOf(value);
        if (index !== -1) {
          updatedNotifyVia.splice(index, 1);
        }
      }
      
      setFormData({
        ...formData,
        notifyVia: updatedNotifyVia,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.product) {
      newErrors.product = 'Product is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (formData.notifyVia.length === 0) {
      newErrors.notifyVia = 'Select at least one notification method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAlert = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        active: true,
      };
      
      setAlerts([...alerts, newAlert]);
      setShowForm(false);
      setFormData({
        product: '',
        condition: 'above',
        price: '',
        region: 'any',
        notifyVia: ['email', 'app'],
      });
    } catch (error) {
      console.error('Failed to create alert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAlertStatus = async (id) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedAlerts = alerts.map(alert => {
        if (alert.id === id) {
          return { ...alert, active: !alert.active };
        }
        return alert;
      });
      
      setAlerts(updatedAlerts);
    } catch (error) {
      console.error('Failed to update alert:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAlert = async (id) => {
    if (!window.confirm('Are you sure you want to delete this price alert?')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedAlerts = alerts.filter(alert => alert.id !== id);
      setAlerts(updatedAlerts);
    } catch (error) {
      console.error('Failed to delete alert:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Price Alerts</h2>
        
        <Button
          color="green"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ New Alert'}
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6 p-6">
          <h3 className="text-lg font-medium mb-4">Set Up Price Alert</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select a product</option>
                  {productOptions.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                {errors.product && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.product}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Region
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
                >
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>
                      {region === 'any' ? 'Any region' : region}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Alert Condition
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">Notify me when price goes</span>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="above">above</option>
                    <option value="below">below</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Input
                  label="Price (KES)"
                  name="price"
                  type="number"
                  placeholder="Enter price threshold"
                  value={formData.price}
                  onChange={handleChange}
                  error={errors.price}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notification Method
              </label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notify-email"
                    name="notifyVia"
                    value="email"
                    checked={formData.notifyVia.includes('email')}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="notify-email" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notify-app"
                    name="notifyVia"
                    value="app"
                    checked={formData.notifyVia.includes('app')}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="notify-app" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    App Notification
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notify-sms"
                    name="notifyVia"
                    value="sms"
                    checked={formData.notifyVia.includes('sms')}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="notify-sms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    SMS
                  </label>
                </div>
              </div>
              {errors.notifyVia && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.notifyVia}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                color="green"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  'Create Alert'
                )}
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : alerts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any price alerts yet</p>
          <Button
            color="green"
            onClick={() => setShowForm(true)}
          >
            + Create Your First Alert
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`p-4 ${!alert.active ? 'opacity-70' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{alert.product}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.active ? 
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {alert.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="mt-1">
                    <p className="text-gray-600 dark:text-gray-400">
                      Alert when price goes <span className="font-medium">{alert.condition}</span>{' '}
                      <span className="font-semibold text-green-700 dark:text-green-500">{alert.price} KES</span>
                      {alert.region !== 'any' && ` in ${alert.region}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Created on {formatDate(alert.createdAt)} • Notify via {alert.notifyVia.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button
                    size="sm"
                    color={alert.active ? 'secondary' : 'green'}
                    onClick={() => toggleAlertStatus(alert.id)}
                  >
                    {alert.active ? 'Pause' : 'Activate'}
                  </Button>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-6">
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-yellow-700 dark:text-yellow-500">About Price Alerts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Price alerts help you stay informed about market changes without constantly checking prices. When a produce's price matches your criteria, you'll receive notifications through your chosen methods. This feature helps you make better selling decisions.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;