// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh'
    },
    USERS: '/api/users',
    DASHBOARD: '/api/dashboard'
  }
} as const;

export type ApiEndpoint = typeof API_CONFIG.ENDPOINTS;