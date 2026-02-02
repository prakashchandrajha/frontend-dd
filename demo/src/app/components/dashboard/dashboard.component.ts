import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ProfileComponent } from '../profile/profile.component';
import { CreateNpaComponent } from '../create-npa/create-npa.component';
import { NpaDetailComponent } from '../npa-detail/npa-detail.component';
import { NpaListComponent } from '../npa-list/npa-list.component';
import { QueueComponent } from '../queue/queue.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, ProfileComponent, CreateNpaComponent, NpaDetailComponent, NpaListComponent, QueueComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentView: 'home' | 'profile' | 'createUser' | 'createNpa' | 'npaDetail' | 'npaList' | 'queue' = 'home';
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

  constructor(public authService: AuthServiceService) {
    // Check user role on component initialization
    console.log('User role:', this.authService.getUserRole());
    console.log('Is admin:', this.authService.isAdmin());
  }

  getCurrentUsername(): string {
    const token = this.authService.getToken();
    if (!token) return 'Unknown User';
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decoded = JSON.parse(jsonPayload);
      return decoded.sub || decoded.username || 'Unknown User';
    } catch (error) {
      console.error('Error decoding token for username:', error);
      return 'Unknown User';
    }
  }

  getCurrentUserDivision(): string {
    const token = this.authService.getToken();
    if (!token) return '';
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decoded = JSON.parse(jsonPayload);
      return decoded.divisionName || decoded.division || '';
    } catch (error) {
      console.error('Error decoding token for division:', error);
      return '';
    }
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
    
    // Check if we already have a valid token
    const existingToken = this.authService.getToken();
    
    if (existingToken) {
      console.log('Using existing token for user creation');
      this.createUserWithToken(existingToken);
      return;
    }
    
    // If no token, use admin credentials to get one
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
        this.authService.setToken(token);
        
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

  toggleUserForm() {
    this.currentView = this.currentView === 'createUser' ? 'home' : 'createUser';
    if (this.currentView === 'createUser') {
      this.resetForm(); // Reset form when opening
    }
  }

  showProfile() {
    this.currentView = 'profile';
  }

  showHome() {
    this.currentView = 'home';
  }

  showCreateNpa() {
    this.currentView = 'createNpa';
  }

  showNpaList() {
    this.currentView = 'npaList';
  }

  showNpaDetail() {
    this.currentView = 'npaDetail';
  }

  showQueue() {
    this.currentView = 'queue';
  }

  logout() {
    this.authService.clearToken();
    // Redirect to login page or reload the app
    window.location.href = '/login';
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.successResponse = null;
    this.successMessage = '';
  }
}
