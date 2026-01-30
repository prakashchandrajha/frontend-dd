import { API_CONFIG } from '../lib/api-config';
import { LoginRequest, LoginResponse } from '../types/auth';

export class AuthService {
  private static readonly TOKEN_KEY = 'authToken';

  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Sending login request to:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`);
      console.log('Credentials:', credentials);
      
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

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Parse JSON
      let data: LoginResponse;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response format from server');
      }
      
      console.log('Parsed data:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Authentication failed`);
      }

      if (!data.token) {
        throw new Error('No token received from server');
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network connection failed - make sure the backend server is running on port 8080');
      }
      throw error instanceof Error ? error : new Error('Unknown error occurred');
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