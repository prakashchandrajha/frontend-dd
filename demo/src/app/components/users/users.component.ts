import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  user = {
    username: '',
    password: '',
    userType: 'DIVISION',
    divisionName: '',
    regionalOfficeName: ''
  };
  
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  userTypes = [
    { value: 'DIVISION', label: 'Division' },
    { value: 'REGIONAL_OFFICE', label: 'Regional Office' },
    { value: 'RECOVERY', label: 'Recovery' },
    { value: 'LEGAL', label: 'Legal' }
  ];

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    // Initialize form with empty values
    this.resetForm();
  }

  get isDivisionUser(): boolean {
    return this.user.userType === 'DIVISION';
  }

  get isRegionalOfficeUser(): boolean {
    return this.user.userType === 'REGIONAL_OFFICE';
  }

  createUser() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Use hardcoded admin credentials to get token
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    
    // First login to get the token
    this.authService.login(adminUsername, adminPassword).subscribe({
      next: (loginResponse) => {
        const token = loginResponse.token || loginResponse.accessToken;
        
        if (!token) {
          this.errorMessage = 'Failed to obtain authentication token';
          this.isLoading = false;
          return;
        }
        
        // Store token for future use
        localStorage.setItem('authToken', token);
        
        // Now create the user with the obtained token
        this.createUserWithToken(token);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Failed to authenticate as admin';
        this.isLoading = false;
      }
    });
  }

  private createUserWithToken(token: string) {

    // Prepare payload based on user type
    let payload: any = {
      username: this.user.username,
      password: this.user.password,
      userType: this.user.userType
    };

    // Add type-specific fields
    if (this.isDivisionUser && this.user.divisionName) {
      payload.divisionName = this.user.divisionName;
    }
    
    if (this.isRegionalOfficeUser && this.user.regionalOfficeName) {
      payload.regionalOfficeName = this.user.regionalOfficeName;
    }

    this.authService.createUser(payload, token).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.successMessage = 'User created successfully!';
        this.errorMessage = '';
        this.resetForm();
        this.isLoading = false;
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.errorMessage = error.error?.message || 'Failed to create user. Please try again.';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.user = {
      username: '',
      password: '',
      userType: 'DIVISION',
      divisionName: '',
      regionalOfficeName: ''
    };
  }

  onUserTypeChange() {
    // Clear type-specific fields when user type changes
    this.user.divisionName = '';
    this.user.regionalOfficeName = '';
  }
}