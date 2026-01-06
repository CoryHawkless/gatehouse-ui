// API Client for Gatehouse Backend
// Uses session-based authentication with cookies

import { config } from '@/config';

interface ApiResponse<T = unknown> {
  version: string;
  success: boolean;
  code: number;
  message: string;
  data?: T;
  error?: {
    type: string;
    details: Record<string, unknown>;
  };
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  expires_at: string;
}

export interface LoginResponse {
  user: User;
  session: Session;
}

export interface ProfileResponse {
  user: User;
}

class ApiError extends Error {
  code: number;
  type: string;
  details: Record<string, unknown>;

  constructor(message: string, code: number, type: string, details: Record<string, unknown> = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.type = type;
    this.details = details;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
    ...options,
    credentials: 'include', // Important: include session cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json: ApiResponse<T> = await response.json();

  if (!json.success) {
    throw new ApiError(
      json.message || 'An error occurred',
      json.code,
      json.error?.type || 'UNKNOWN_ERROR',
      json.error?.details || {}
    );
  }

  return json.data as T;
}

export const api = {
  auth: {
    login: (email: string, password: string, remember_me = false) =>
      request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, remember_me }),
      }),

    logout: () =>
      request<void>('/auth/logout', {
        method: 'POST',
      }),
  },

  users: {
    me: () => request<ProfileResponse>('/users/me'),

    updateMe: (data: { full_name?: string; avatar_url?: string }) =>
      request<ProfileResponse>('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
};

export { ApiError };
