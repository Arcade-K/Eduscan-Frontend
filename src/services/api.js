import { Platform } from 'react-native';

const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.65:4000';

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  const res = await fetch(`${DEFAULT_BASE_URL}${path}`, {
    headers,
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => request('/health'),
  
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
  
  // Authentication
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  
  // Profile
  getProfile: () => request('/profile'),
  updateProfile: (profile) => request('/profile', { method: 'PUT', body: JSON.stringify(profile) }),
};


