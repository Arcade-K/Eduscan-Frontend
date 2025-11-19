import { Platform } from 'react-native';

// Get the base URL for API requests
const getBaseURL = () => {
  // Allow override via environment variable
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  // For iOS simulator, use localhost
  if (Platform.OS === 'ios') {
    // Check if we're in development and might be on a physical device
    // If localhost doesn't work, user should set EXPO_PUBLIC_API_URL to their machine's IP
    return 'http://localhost:4000';
  }
  
  // For Android emulator, use 10.0.2.2
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  }
  
  // Default fallback
  return 'http://localhost:4000';
};

const DEFAULT_BASE_URL = getBaseURL();

// Log the API URL for debugging (only in development)
if (__DEV__) {
  console.log('🔗 API Base URL:', DEFAULT_BASE_URL);
}

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  
  try {
    const res = await fetch(`${DEFAULT_BASE_URL}${path}`, {
      headers,
      ...options,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    // Improve error messages for network failures
    if (error.message === 'Network request failed' || error.message.includes('Network')) {
      throw new Error(`Cannot connect to backend at ${DEFAULT_BASE_URL}. Make sure the backend server is running.`);
    }
    throw error;
  }
}

export const api = {
  health: () => request('/health'),
  
  // Authentication
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password, username) => request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, username }) }),
  verifyToken: () => request('/auth/verify'),
  deleteAccount: () => request('/auth/account', { method: 'DELETE' }),
  
  // Notes
  getNotes: () => request('/notes'),
  createNote: (note) => request('/notes', { method: 'POST', body: JSON.stringify(note) }),
  updateNote: (id, note) => request(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(note) }),
  deleteNote: (id) => request(`/notes/${id}`, { method: 'DELETE' }),
  
  // Questions
  getQuestions: () => request('/questions'),
  getQuestion: (id) => request(`/questions/${id}`),
  createQuestion: (question) => request('/questions', { method: 'POST', body: JSON.stringify(question) }),
  addAnswer: (questionId, answer) => request(`/questions/${questionId}/answers`, { method: 'POST', body: JSON.stringify(answer) }),
  
  // Profile
  getProfile: () => request('/profile'),
  updateProfile: (profile) => request('/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  
  // Notifications
  getNotifications: () => request('/notifications'),
  createNotification: (notification) => request('/notifications', { method: 'POST', body: JSON.stringify(notification) }),
  markNotificationAsRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),
  
  // Messages
  getMessages: () => request('/messages'),
  sendMessage: (message) => request('/messages', { method: 'POST', body: JSON.stringify(message) }),
  
  // Browsing History
  getBrowsingHistory: () => request('/browsing-history'),
  addBrowsingHistory: (historyItem) => request('/browsing-history', { method: 'POST', body: JSON.stringify(historyItem) }),
  
  // Blocked Users
  getBlockedUsers: () => request('/blocked-users'),
  blockUser: (blockedUserId) => request('/blocked-users', { method: 'POST', body: JSON.stringify({ blockedUserId }) }),
  unblockUser: (blockedUserId) => request(`/blocked-users/${blockedUserId}`, { method: 'DELETE' }),
  
  // Settings
  getSettings: () => request('/settings'),
  updateSettings: (settings) => request('/settings', { method: 'PUT', body: JSON.stringify(settings) }),
};


