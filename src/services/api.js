import { Platform } from 'react-native';

const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

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
  getNotes: () => request('/notes'),
  createNote: (note) => request('/notes', { method: 'POST', body: JSON.stringify(note) }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getQuestions: () => request('/questions'),
  getProfile: () => request('/profile'),
};


