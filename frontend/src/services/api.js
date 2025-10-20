import axios from 'axios';
import { API_ENDPOINTS } from '../utils/config';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Upload document
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(API_ENDPOINTS.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Query the RAG system
export const queryRAG = async (question) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.query, {
      question,
    });
    return response.data;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

// Submit feedback
export const submitFeedback = async (messageId, feedback) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.feedback, {
      message_id: messageId,
      feedback,
    });
    return response.data;
  } catch (error) {
    console.error('Feedback error:', error);
    throw error;
  }
};
