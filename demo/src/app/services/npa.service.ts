import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class NpaService {
  private npaUrl = 'http://localhost:8080/api/npa';

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getNpaById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    // Add cache-busting parameter
    const timestamp = new Date().getTime();
    return this.http.get(`${this.npaUrl}/${id}?t=${timestamp}`, { headers });
  }

  getAllNpas(): Observable<any> {
    const headers = this.getAuthHeaders();
    // Add cache-busting parameter
    const timestamp = new Date().getTime();
    return this.http.get(`${this.npaUrl}?t=${timestamp}`, { headers });
  }

  getNpasByUser(username: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.npaUrl}/user/${username}`, { headers });
  }

  createNpa(npaData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.npaUrl}/create`, npaData, { headers });
  }

  completeTask(npaId: number, taskId: string, variables?: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = variables ? { taskId, ...variables } : { taskId };
    return this.http.post(`${this.npaUrl}/${npaId}/complete-task`, variables || {}, { 
      headers,
      params: { taskId } as any
    });
  }
}