/**
 * Central API Configuration for Urban Requister.
 * This file handles the transition between local development and production.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  PRODUCTS: {
    BASE: `${API_BASE_URL}/api/products`,
    BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,
  },
};

/**
 * Helper to handle image paths that may be stored as local uploads.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/logo.png';
  if (imagePath.startsWith('/uploads/')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  return imagePath;
};
