// src/components/PostProduce.jsx
import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';

const PostProduce = () => {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    unit: 'kg',
    price: '',
    location: '',
    description: '',
    availableFrom: '',
    availableTo: '',
    useCurrentLocation: true,
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Product categories for selection
  const productCategories = [
    'Vegetables', 'Fruits', 'Cereals', 'Dairy', 'Meat', 'Poultry', 'Fish', 'Other'
  ];
  
  // Units for quantity
  const units = ['kg', 'ton', 'piece', 'box', 'crate', 'sack'];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const getCurrentLocation = () => {
    if (navigator.geolocation && formData.useCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In real app, you would reverse geocode to get the place name
          // For now, we'll just use the coordinates
          const location = `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`;
          setFormData({
            ...formData,
            location,
          });
        },
        (error) => {
          setErrors({
            ...errors,
            location: 'Failed to get current location. Please enter manually.',
          });
        }
      );
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.location && !formData.useCurrentLocation) {
      newErrors.location = 'Location is required';
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
      // In a real app, this would be an API call to save the produce listing
      // For demo purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setTimeout(() => {
        setFormData({
          productName: '',
          quantity: '',
          unit: 'kg',
          price: '',
          location: '',
          description: '',
          availableFrom: '',
          availableTo: '',
          useCurrentLocation: true,
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors({
        form: 'Failed to submit. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Post Your Produce for Sale</h2>
      
      {isSuccess ? (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg text-green-700 dark:text-green-400 mb-4">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Successfully posted your produce!</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errors.form && (
            <div className="p-4 bg-red-100 border border-red-500 rounded-lg text-red-700 mb-4">
              {errors.form}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Product Name"
              name="productName"
              placeholder="e.g., Tomatoes, Maize, Milk"
              value={formData.productName}
              onChange={handleChange}
              error={errors.productName}
              required
            />
            
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="Amount"
                  value={formData.quantity}
                  onChange={handleChange}
                  error={errors.quantity}
                  required
                />
              </div>
              
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Unit
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Price (KES)"
              name="price"
              type="number"
              placeholder="Price per unit"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select a category</option>
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="useCurrentLocation"
                name="useCurrentLocation"
                checked={formData.useCurrentLocation}
                onChange={handleChange}
                className="rounded border-gray-300 text-green-600 focus:border-green-500 focus:ring-green-500 mr-2"
              />
              <label htmlFor="useCurrentLocation" className="text-sm text-gray-700 dark:text-gray-300">
                Use my current location
              </label>
            </div>
            
            {!formData.useCurrentLocation ? (
              <Input
                label="Location"
                name="location"
                placeholder="e.g., Nairobi, Kenya"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                required={!formData.useCurrentLocation}
              />
            ) : (
              <Card className="p-3 bg-gray-50 dark:bg-gray-800 mb-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Location</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formData.location || "Location will be detected when you submit"}
                  </p>
                </div>
                <Button
                  size="sm"
                  color="secondary"
                  onClick={getCurrentLocation}
                  type="button"
                >
                  Detect Now
                </Button>
              </Card>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Available From"
              name="availableFrom"
              type="date"
              value={formData.availableFrom}
              onChange={handleChange}
            />
            
            <Input
              label="Available Until"
              name="availableTo"
              type="date"
              value={formData.availableTo}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product (quality, variety, etc.)"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              color="secondary"
              onClick={() => setFormData({
                productName: '',
                quantity: '',
                unit: 'kg',
                price: '',
                location: '',
                description: '',
                availableFrom: '',
                availableTo: '',
                useCurrentLocation: true,
              })}
            >
              Clear Form
            </Button>
            
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
                  Posting...
                </div>
              ) : (
                'Post Produce'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostProduce;