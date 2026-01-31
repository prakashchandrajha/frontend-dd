import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { DivisionService, Division, RegionalOffice } from '../../services/division.service';
import { Subscription } from 'rxjs';

export interface CreateUserRequest {
  username: string;
  password: string;
  userType: 'DIVISION' | 'REGIONAL_OFFICE' | 'RECOVERY' | 'LEGAL';
  divisionId?: number | null;
  divisionName?: string;
  regionalOfficeId?: number | null;
  regionalOfficeName?: string;
}

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-user-modal-overlay" *ngIf="isVisible" (click)="closeModal()">
      <div class="create-user-modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <div>
            <h2>Create New User</h2>
            <p class="modal-subtitle" *ngIf="formData.userType">{{ getUserTypeDescription() }}</p>
          </div>
          <button class="close-btn" (click)="closeModal()">&times;</button>
        </div>
        
        <form (ngSubmit)="onSubmit()" #createForm="ngForm" class="create-user-form">
          <!-- Basic Information Section -->
          <div class="form-section">
            <h3 class="section-title">Basic Information</h3>
            
            <div class="form-group">
              <label for="username">Username <span class="required">*</span></label>
              <input
                type="text"
                id="username"
                name="username"
                [(ngModel)]="formData.username"
                required
                class="form-control"
                placeholder="Enter username"
              >
            </div>

            <div class="form-group">
              <label for="password">Password <span class="required">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                [(ngModel)]="formData.password"
                required
                class="form-control"
                placeholder="Enter password (min 8 characters recommended)"
              >
            </div>

            <div class="form-group">
              <label for="userType">User Type <span class="required">*</span></label>
              <select
                id="userType"
                name="userType"
                [(ngModel)]="formData.userType"
                (ngModelChange)="onUserTypeChange($event)"
                required
                class="form-control"
              >
                <option value="">Select User Type</option>
                <option value="DIVISION">Division</option>
                <option value="REGIONAL_OFFICE">Regional Office</option>
                <option value="RECOVERY">Recovery</option>
                <option value="LEGAL">Legal</option>
              </select>
            </div>
          </div>

          <!-- Division Section -->
          <div class="form-section" *ngIf="formData.userType === 'DIVISION'">
            <h3 class="section-title">Division Details</h3>
            
            <div class="form-group">
              <label for="divisionId">Division <span class="required">*</span></label>
              <select
                id="divisionId"
                name="divisionId"
                [(ngModel)]="formData.divisionId"
                (change)="onDivisionSelection($event)"
                [disabled]="isLoadingDivisions"
                class="form-control"
              >
                <option [value]="null">{{ isLoadingDivisions ? 'Loading divisions...' : 'Select Division' }}</option>
                <option *ngFor="let division of divisions" [value]="division.id">
                  {{ division.name }}
                </option>
              </select>
              <small class="form-text" *ngIf="!isLoadingDivisions">Select a division from the list</small>
              <small class="form-text" style="color: #999;" *ngIf="isLoadingDivisions">Loading divisions...</small>
            </div>

            <div class="form-group" *ngIf="formData.divisionId">
              <label for="divisionNameDisplay">Division Name</label>
              <input
                type="text"
                id="divisionNameDisplay"
                [(ngModel)]="formData.divisionName"
                class="form-control"
                disabled
                placeholder="Division name (auto-filled)"
              >
              <small class="form-text">Auto-filled based on selection</small>
            </div>
          </div>

          <!-- Regional Office Section -->
          <div class="form-section" *ngIf="formData.userType === 'REGIONAL_OFFICE'">
            <h3 class="section-title">Regional Office Details</h3>
            
            <div class="form-group">
              <label for="regionalOfficeId">Regional Office <span class="required">*</span></label>
              <select
                id="regionalOfficeId"
                name="regionalOfficeId"
                [(ngModel)]="formData.regionalOfficeId"
                (change)="onRegionalOfficeSelection($event)"
                [disabled]="isLoadingOffices"
                class="form-control"
              >
                <option [value]="null">{{ isLoadingOffices ? 'Loading offices...' : 'Select Regional Office' }}</option>
                <option *ngFor="let office of regionalOffices" [value]="office.id">
                  {{ office.name }}
                </option>
              </select>
              <small class="form-text" *ngIf="!isLoadingOffices">Select a regional office from the list</small>
              <small class="form-text" style="color: #999;" *ngIf="isLoadingOffices">Loading offices...</small>
            </div>

            <div class="form-group" *ngIf="formData.regionalOfficeId">
              <label for="regionalOfficeNameDisplay">Regional Office Name</label>
              <input
                type="text"
                id="regionalOfficeNameDisplay"
                [(ngModel)]="formData.regionalOfficeName"
                class="form-control"
                disabled
                placeholder="Office name (auto-filled)"
              >
              <small class="form-text">Auto-filled based on selection</small>
            </div>
          </div>

          <!-- Recovery Section Info -->
          <div class="form-section" *ngIf="formData.userType === 'RECOVERY'">
            <div class="info-box">
              <p>This user will have recovery-specific permissions and access to recovery management features.</p>
            </div>
          </div>

          <!-- Legal Section Info -->
          <div class="form-section" *ngIf="formData.userType === 'LEGAL'">
            <div class="info-box">
              <p>This user will have legal-specific permissions and access to legal management features.</p>
            </div>
          </div>
          
          <!-- Messages -->
          <div *ngIf="errorMessage" class="error-message">
            <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ errorMessage }}
          </div>
          <div *ngIf="successMessage" class="success-message">
            <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {{ successMessage }}
          </div>

          <!-- Actions -->
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="!createForm.form.valid || isLoading">
              <span *ngIf="isLoading" class="spinner"></span>
              <span>{{ isLoading ? 'Creating...' : 'Create User' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .create-user-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .create-user-modal {
      background: white;
      border-radius: 12px;
      padding: 0;
      width: 90%;
      max-width: 600px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }

    .modal-subtitle {
      margin: 8px 0 0 0;
      font-size: 13px;
      opacity: 0.9;
      font-weight: 400;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: white;
      padding: 0;
      line-height: 1;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    
    .close-btn:hover {
      opacity: 1;
    }

    .create-user-form {
      padding: 24px;
    }

    .form-section {
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      margin: 0 0 16px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .form-group {
      margin-bottom: 16px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #374151;
      font-size: 14px;
    }

    .required {
      color: #ef4444;
    }
    
    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-control:disabled {
      background-color: #f3f4f6;
      color: #6b7280;
      cursor: not-allowed;
    }

    .form-control::placeholder {
      color: #9ca3af;
    }

    .form-text {
      display: block;
      margin-top: 4px;
      font-size: 12px;
      color: #6b7280;
    }

    .info-box {
      padding: 12px 16px;
      background-color: #f3f4f6;
      border-left: 4px solid #667eea;
      border-radius: 4px;
      font-size: 14px;
      color: #4b5563;
    }

    .info-box p {
      margin: 0;
    }

    .message-icon {
      width: 16px;
      height: 16px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: -2px;
    }
    
    .error-message {
      color: #991b1b;
      margin-bottom: 16px;
      padding: 12px 14px;
      background-color: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 6px;
      font-size: 14px;
      display: flex;
      align-items: center;
    }

    .success-message {
      color: #15803d;
      margin-bottom: 16px;
      padding: 12px 14px;
      background-color: #dcfce7;
      border: 1px solid #bbf7d0;
      border-radius: 6px;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
      transform: translateY(-1px);
    }
    
    .btn-secondary {
      background-color: #e5e7eb;
      color: #374151;
    }
    
    .btn-secondary:hover {
      background-color: #d1d5db;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 600px) {
      .create-user-modal {
        width: 95%;
        max-height: 95vh;
      }

      .modal-header {
        padding: 16px;
      }

      .create-user-form {
        padding: 16px;
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class CreateUserModalComponent implements OnInit, OnDestroy {
  isVisible = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  private subscription = new Subscription();

  // Data for dropdowns
  divisions: Division[] = [];
  regionalOffices: RegionalOffice[] = [];
  isLoadingDivisions = false;
  isLoadingOffices = false;

  formData: CreateUserRequest = {
    username: '',
    password: '',
    userType: 'DIVISION',
    divisionId: null,
    divisionName: '',
    regionalOfficeId: null,
    regionalOfficeName: ''
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private modalService: ModalService,
    private divisionService: DivisionService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.modalService.showModal$.subscribe(show => {
        if (show) {
          this.open();
        }
      })
    );
    
    // Load divisions and regional offices on component init
    this.loadDivisions();
    this.loadRegionalOffices();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Load divisions from service
   */
  loadDivisions() {
    this.isLoadingDivisions = true;
    this.divisionService.getDivisions().subscribe({
      next: (data) => {
        this.divisions = data;
        this.isLoadingDivisions = false;
      },
      error: (error) => {
        console.error('Error loading divisions:', error);
        this.isLoadingDivisions = false;
      }
    });
  }

  /**
   * Load regional offices from service
   */
  loadRegionalOffices() {
    this.isLoadingOffices = true;
    this.divisionService.getRegionalOffices().subscribe({
      next: (data) => {
        this.regionalOffices = data;
        this.isLoadingOffices = false;
      },
      error: (error) => {
        console.error('Error loading regional offices:', error);
        this.isLoadingOffices = false;
      }
    });
  }

  /**
   * Update division name when division ID is selected
   */
  onDivisionChange(divisionId: number | null) {
    if (divisionId !== null && divisionId !== undefined) {
      const selected = this.divisions.find(d => d.id === divisionId);
      if (selected) {
        this.formData.divisionName = selected.name;
      } else {
        this.formData.divisionName = '';
      }
    } else {
      this.formData.divisionName = '';
    }
  }

  /**
   * Update regional office name when office ID is selected
   */
  onRegionalOfficeChange(officeId: number | null) {
    if (officeId !== null && officeId !== undefined) {
      const selected = this.regionalOffices.find(ro => ro.id === officeId);
      if (selected) {
        this.formData.regionalOfficeName = selected.name;
      } else {
        this.formData.regionalOfficeName = '';
      }
    } else {
      this.formData.regionalOfficeName = '';
    }
  }

  /**
   * Handle user type change
   */
  onUserTypeChange(userType: string) {
    this.formData.userType = userType as any;
    // Reset dependent fields when user type changes
    this.formData.divisionId = null;
    this.formData.divisionName = '';
    this.formData.regionalOfficeId = null;
    this.formData.regionalOfficeName = '';
  }

  /**
   * Handle division selection from dropdown
   */
  onDivisionSelection(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (value) {
      const id = Number(value);
      this.formData.divisionId = id;

      // Find the selected division and update the name
      const selected = this.divisions.find(d => d.id === id);
      if (selected) {
        this.formData.divisionName = selected.name;
      } else {
        this.formData.divisionName = '';
      }
    } else {
      this.formData.divisionId = null;
      this.formData.divisionName = '';
    }
  }

  /**
   * Handle regional office selection from dropdown
   */
  onRegionalOfficeSelection(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (value) {
      const id = Number(value);
      this.formData.regionalOfficeId = id;

      // Find the selected office and update the name
      const selected = this.regionalOffices.find(ro => ro.id === id);
      if (selected) {
        this.formData.regionalOfficeName = selected.name;
      } else {
        this.formData.regionalOfficeName = '';
      }
    } else {
      this.formData.regionalOfficeId = null;
      this.formData.regionalOfficeName = '';
    }
  }

  open() {
    this.isVisible = true;
    this.resetForm();
  }

  close() {
    this.isVisible = false;
    this.resetForm();
  }

  closeModal() {
    this.close();
  }

  resetForm() {
    this.formData = {
      username: '',
      password: '',
      userType: 'DIVISION',
      divisionId: null,
      divisionName: '',
      regionalOfficeId: null,
      regionalOfficeName: ''
    };
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = false;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    // Construct the request body based on user type
    const body: any = {
      username: this.formData.username,
      password: this.formData.password,
      userType: this.formData.userType
    };

    // Add conditional fields based on user type (matching curl command format)
    if (this.formData.userType === 'DIVISION' && this.formData.divisionName) {
      body.divisionName = this.formData.divisionName;
    } else if (this.formData.userType === 'REGIONAL_OFFICE' && this.formData.regionalOfficeName) {
      body.regionalOfficeName = this.formData.regionalOfficeName;
    }
    // RECOVERY and LEGAL users only need username, password, and userType

    this.http.post('http://localhost:8080/api/admin/users', body, { headers }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'User created successfully!';
        console.log('User created:', response);
        // Reset form after successful creation
        this.resetForm();
        // Optionally close the modal after a delay
        setTimeout(() => {
          this.close();
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating user:', error);
        this.errorMessage = error.error?.message || 'Failed to create user. Please try again.';
      }
    });
  }

  validateForm(): boolean {
    if (!this.formData.username.trim()) {
      this.errorMessage = 'Username is required.';
      return false;
    }

    if (!this.formData.password.trim()) {
      this.errorMessage = 'Password is required.';
      return false;
    }

    if (!this.formData.userType) {
      this.errorMessage = 'User type is required.';
      return false;
    }

    // Validate based on user type
    if (this.formData.userType === 'DIVISION') {
      if (!this.formData.divisionName?.trim()) {
        this.errorMessage = 'Division Name is required for Division user type.';
        return false;
      }
    } else if (this.formData.userType === 'REGIONAL_OFFICE') {
      if (!this.formData.regionalOfficeName?.trim()) {
        this.errorMessage = 'Regional Office Name is required for Regional Office user type.';
        return false;
      }
    }
    // RECOVERY and LEGAL user types don't require additional fields

    this.errorMessage = '';
    return true;
  }

  // Helper method to check if additional fields are required
  requiresAdditionalFields(): boolean {
    return this.formData.userType === 'DIVISION' || this.formData.userType === 'REGIONAL_OFFICE';
  }

  // Helper method to get user type description
  getUserTypeDescription(): string {
    switch (this.formData.userType) {
      case 'DIVISION':
        return 'Create a user for a specific division with division-level permissions';
      case 'REGIONAL_OFFICE':
        return 'Create a user for a regional office with regional-level permissions';
      case 'RECOVERY':
        return 'Create a recovery user with recovery-specific permissions';
      case 'LEGAL':
        return 'Create a legal user with legal-specific permissions';
      default:
        return '';
    }
  }
}