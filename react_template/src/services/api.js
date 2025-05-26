// Base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for making API requests
const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication
export const auth = {
  login: (credentials) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  },
};

// Products
export const products = {
  search: (params) =>
    fetchWithAuth(`/products/search?${new URLSearchParams(params)}`),

  getById: (id) =>
    fetchWithAuth(`/products/${id}`),

  create: (productData) =>
    fetchWithAuth('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  update: (id, productData) =>
    fetchWithAuth(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),

  delete: (id) =>
    fetchWithAuth(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Messages
export const messages = {
  send: (messageData) =>
    fetchWithAuth('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    }),

  getConversations: () =>
    fetchWithAuth('/messages/conversations'),

  getMessages: (conversationId) =>
    fetchWithAuth(`/messages/conversations/${conversationId}`),
};

// User Profile
export const profile = {
  get: () =>
    fetchWithAuth('/profile'),

  update: (profileData) =>
    fetchWithAuth('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  getSellerProfile: (sellerId) =>
    fetchWithAuth(`/profile/seller/${sellerId}`),
};

// Location
export const location = {
  searchNearby: (coordinates, radius) =>
    fetchWithAuth(`/location/nearby?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=${radius}`),

  geocode: (address) =>
    fetchWithAuth(`/location/geocode?address=${encodeURIComponent(address)}`),

  reverseGeocode: (coordinates) =>
    fetchWithAuth(`/location/reverse-geocode?lat=${coordinates.lat}&lng=${coordinates.lng}`),
};

export default {
  auth,
  products,
  messages,
  profile,
  location,
}; 