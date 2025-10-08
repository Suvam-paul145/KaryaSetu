import { Task, ChatMessage, UserSettings } from '@/types/task';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Auth token helper
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Task API
export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  getById: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch task');
    return response.json();
  },

  create: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  update: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },
};

// Chat API
export const chatApi = {
  sendMessage: async (message: string): Promise<ChatMessage> => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },

  getHistory: async (): Promise<ChatMessage[]> => {
    const response = await fetch(`${API_BASE_URL}/chat/history`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch chat history');
    return response.json();
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: any }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  register: async (email: string, password: string, name: string): Promise<{ token: string; user: any }> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('authToken');
  },
};

// Settings API
export const settingsApi = {
  get: async (): Promise<UserSettings> => {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  },

  update: async (settings: Partial<UserSettings>): Promise<UserSettings> => {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to update settings');
    return response.json();
  },
};
