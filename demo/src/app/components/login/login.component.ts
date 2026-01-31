import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  login() {
    this.errorMessage = '';
    console.log('Attempting login with:', { username: this.username });
    
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        
        // Extract and store token
        const token = response.token || response.accessToken || response.jwt;
        if (token) {
          this.authService.setToken(token);
          console.log('Token stored successfully');
          
          // Decode token to check user role (optional)
          try {
            const decodedToken = this.decodeToken(token);
            console.log('Decoded token:', decodedToken);
          } catch (e) {
            console.warn('Could not decode token:', e);
          }
          
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        } else {
          console.error('No token found in response');
          this.errorMessage = 'Login failed: No authentication token received';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }
}
