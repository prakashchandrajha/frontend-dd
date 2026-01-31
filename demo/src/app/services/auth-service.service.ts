import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authUrl = 'http://localhost:8080/api/auth/login';
  private adminUrl = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, {
      username: username,
      password: password
    });
  }

  createUser(userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post(this.adminUrl, userData, { headers });
  }
}
