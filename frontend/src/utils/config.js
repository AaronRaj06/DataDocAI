// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  upload: `${API_BASE_URL}/upload`,
  query: `${API_BASE_URL}/query`,
  feedback: `${API_BASE_URL}/feedback`,
};
