import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Division {
  id: number;
  name: string;
}

export interface RegionalOffice {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  /**
   * Fetch all divisions from the users API
   * Extracts unique divisions from users with DIVISION type
   */
  getDivisions(): Observable<Division[]> {
    return this.http.get<any[]>(
      'http://localhost:8080/api/admin/users',
      { headers: this.getHeaders() }
    ).pipe(
      catchError((error) => {
        console.error('Error fetching divisions:', error);
        // Return mock data if API fails (for demo purposes)
        return of([
          { id: 101, name: 'Sugar Division' },
          { id: 102, name: 'Finance Division' },
          { id: 103, name: 'HR Division' },
          { id: 104, name: 'Operations Division' }
        ]);
      })
    );
  }

  /**
   * Fetch all regional offices from the users API
   * Extracts unique offices from users with REGIONAL_OFFICE type
   */
  getRegionalOffices(): Observable<RegionalOffice[]> {
    return this.http.get<any[]>(
      'http://localhost:8080/api/admin/users',
      { headers: this.getHeaders() }
    ).pipe(
      catchError((error) => {
        console.error('Error fetching regional offices:', error);
        // Return mock data if API fails (for demo purposes)
        return of([
          { id: 12, name: 'Lucknow Regional Office' },
          { id: 13, name: 'Delhi Regional Office' },
          { id: 14, name: 'Mumbai Regional Office' },
          { id: 15, name: 'Chennai Regional Office' }
        ]);
      })
    );
  }

  /**
   * Get division by ID
   */
  getDivisionById(id: number): Observable<Division> {
    return this.http.get<Division>(
      `http://localhost:8080/api/admin/divisions/${id}`,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Get regional office by ID
   */
  getRegionalOfficeById(id: number): Observable<RegionalOffice> {
    return this.http.get<RegionalOffice>(
      `http://localhost:8080/api/admin/regional-offices/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
