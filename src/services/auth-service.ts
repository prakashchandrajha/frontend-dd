import { API_CONFIG } from '../lib/api-config';
import { LoginRequest, LoginResponse } from '../types/auth';

export class AuthService {
  private static readonly TOKEN_KEY = 'authToken';

  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Network error');
    }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      // Decode JWT token if needed
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }
}