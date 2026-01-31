import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showUserForm = false;
  
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
  showSuccessModal: boolean = false;
  successResponse: any = null;

  userTypes = [
    { value: 'DIVISION', label: 'Division' },
    { value: 'REGIONAL_OFFICE', label: 'Regional Office' },
    { value: 'RECOVERY', label: 'Recovery' },
    { value: 'LEGAL', label: 'Legal' }
  ];

  constructor(private authService: AuthServiceService, private cdr: ChangeDetectorRef) {
    // Test modal visibility - remove this after confirming it works
    // setTimeout(() => {
    //   this.showSuccessModal = true;
    //   this.successResponse = {
    //     userId: 12,
    //     username: "testuser",
    //     userType: "DIVISION",
    //     divisionName: "Test Division",
    //     isAdmin: false,
    //     message: "Test message"
    //   };
    //   console.log('Test modal shown');
    // }, 2000);
  }

  get isDivisionUser(): boolean {
    return this.user.userType === 'DIVISION';
  }

  get isRegionalOfficeUser(): boolean {
    return this.user.userType === 'REGIONAL_OFFICE';
  }

  createUser() {
    console.log('Create user method called');
    this.isLoading = true;
    this.errorMessage = '';
    this.showSuccessModal = false;
    
    // Use hardcoded admin credentials to get token
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    
    console.log('Attempting admin login...');
    // First login to get the token
    this.authService.login(adminUsername, adminPassword).subscribe({
      next: (loginResponse) => {
        console.log('Admin login successful:', loginResponse);
        const token = loginResponse.token || loginResponse.accessToken;
        
        if (!token) {
          this.errorMessage = 'Failed to obtain authentication token';
          this.isLoading = false;
          return;
        }
        
        console.log('Token obtained:', token.substring(0, 20) + '...');
        // Store token for future use
        localStorage.setItem('authToken', token);
        
        // Now create the user with the obtained token
        console.log('Calling createUserWithToken...');
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
        this.successResponse = response;
        this.showSuccessModal = true;
        this.isLoading = false;
        this.resetForm();
        console.log('Modal should be showing now:', this.showSuccessModal);
        // Force change detection
        this.cdr.detectChanges();
        
        // Fallback timeout to ensure modal appears
        setTimeout(() => {
          if (!this.showSuccessModal) {
            console.log('Fallback: Forcing modal to show');
            this.showSuccessModal = true;
            this.cdr.detectChanges();
          }
        }, 100);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.errorMessage = error.error?.message || 'Failed to create user. Please try again.';
        this.successMessage = '';
        this.isLoading = false;
        this.showSuccessModal = false;
        console.log('Error occurred, modal hidden:', this.showSuccessModal);
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

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.successResponse = null;
    this.successMessage = '';
  }

  testModal() {
    console.log('Test modal button clicked');
    this.successResponse = {
      userId: 999,
      username: "testuser123",
      userType: "DIVISION",
      divisionName: "Test Division",
      isAdmin: false,
      message: "This is a test response"
    };
    this.showSuccessModal = true;
    this.cdr.detectChanges();
    console.log('Test modal should be visible now');
  }
}
