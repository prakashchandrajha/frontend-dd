import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  
  constructor(private authService: AuthServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Profile component initialized');
    // Small delay to ensure component is fully rendered
    setTimeout(() => {
      this.loadUsers();
    }, 100);
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
        
        // Force UI update
        this.usersData = [...response]; // Create new array reference
        this.loadingUsers = false;
        this.errorMessage = '';
        this.cdr.detectChanges(); // Force change detection
        
        console.log('Users data updated, new length:', this.usersData.length);
        console.log('Loading state:', this.loadingUsers);
        console.log('Error message:', this.errorMessage);
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