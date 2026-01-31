import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  usersData: any[] = [];
  loadingUsers = false;
  errorMessage: string = '';
  
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    console.log('Profile component initialized');
    this.loadUsers();
  }

  loadUsers() {
    console.log('Loading users data...');
    console.log('Current users data length:', this.usersData.length);
    this.loadingUsers = true;
    this.errorMessage = '';
    this.usersData = [];
    
    // Get token from storage
    const token = this.authService.getToken();
    
    if (!token) {
      console.error('No authentication token found');
      this.errorMessage = 'Authentication required. Please login first.';
      this.loadingUsers = false;
      return;
    }
    
    this.authService.getUsers(token).subscribe({
      next: (response) => {
        console.log('Users data fetched successfully:', response);
        console.log('Response type:', typeof response);
        console.log('Response length:', Array.isArray(response) ? response.length : 'Not an array');
        this.usersData = response;
        this.loadingUsers = false;
        console.log('Users data updated, new length:', this.usersData.length);
      },
      error: (error) => {
        console.error('Error fetching users data:', error);
        this.errorMessage = error.error?.message || 'Failed to fetch users data. Please try again.';
        this.loadingUsers = false;
        this.usersData = [];
      }
    });
  }

  refreshUsers() {
    this.loadUsers();
  }
}