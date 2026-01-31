import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authUrl = 'http://localhost:8080/api/auth/login';
  private adminUrl = 'http://localhost:8080/api/admin/users';
  private usersUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, {
      username: username,
      password: password
    });
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decoded = JSON.parse(jsonPayload);
      return decoded.userType || decoded.role || (decoded.isAdmin ? 'ADMIN' : null) || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN' || role === 'ROLE_ADMIN' || role === 'admin';
  }

  createUser(userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post(this.adminUrl, userData, { headers });
  }

  getUsers(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get(this.usersUrl, { headers });
  }
}
