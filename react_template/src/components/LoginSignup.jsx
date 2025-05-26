// src/components/LoginSignup.jsx
import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

const LoginSignup = ({ onLogin, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = 'Email or phone number is required';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, you would make an API call here
      // For demo purposes, we'll simulate a successful login/signup after a short delay
      setTimeout(() => {
        const userData = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          name: formData.name || 'User',
          email: formData.email || null,
          phone: formData.phone || null,
          role: localStorage.getItem('userRole') || 'buyer',
        };
        
        onLogin(userData);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setErrors({ form: 'Authentication failed. Please try again.' });
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest-' + Math.random().toString(36).substr(2, 9),
      name: 'Guest User',
      isGuest: true,
      role: localStorage.getItem('userRole') || 'buyer',
    };
    
    onLogin(guestUser);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-500">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isLogin 
              ? 'Log in to access your Market Match account' 
              : 'Sign up to connect with farmers and buyers'
            }
          </p>
        </div>
        
        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
            </div>
          )}
          
          <div className="mb-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          
          <div className="mb-4">
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter email or phone (or both)
            </p>
          </div>
          
          <div className="mb-6">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              type="submit" 
              color="green" 
              fullWidth 
              disabled={isLoading}
              className="py-3"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Log In' : 'Sign Up'
              )}
            </Button>
            
            <Button 
              type="button" 
              color="secondary"
              fullWidth
              onClick={handleGuestLogin}
              className="py-3"
            >
              Continue as Guest
            </Button>
            
            <Button 
              type="button" 
              color="transparent"
              fullWidth
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-700 dark:text-green-500"
            >
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Log In"
              }
            </Button>
            
            <Button 
              type="button" 
              color="transparent"
              fullWidth
              onClick={onCancel}
              className="text-gray-600 dark:text-gray-400 mt-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginSignup;