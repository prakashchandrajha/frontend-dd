import { Component, ViewChild } from '@angular/core';
import { BasicDetailsOfTheBorrower1Component } from '../basic-details-of-the-borrower-1/basic-details-of-the-borrower-1.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NpaService } from '../../services/npa.service';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-npa-form',
  imports: [BasicDetailsOfTheBorrower1Component, CommonModule],
  templateUrl: './npa-form.component.html',
  styleUrl: './npa-form.component.css'
})
export class NpaFormComponent {
  @ViewChild(BasicDetailsOfTheBorrower1Component) borrowerDetails!: BasicDetailsOfTheBorrower1Component;
  
  formData: any = {};
  isSubmitting = false;
  
  constructor(
    private router: Router,
    private npaService: NpaService,
    private authService: AuthServiceService
  ) {}
  
  onBorrowerFormDataChange(data: any) {
    console.log('Form data changed:', data);
    this.formData = { ...this.formData, ...data };
  }
  
  onSubmit() {
    console.log('=== onSubmit called ===');
    console.log('Form data:', this.formData);
    
    if (!this.formData.borrowerName || !this.formData.npaDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    this.isSubmitting = true;
    console.log('Submitting NPA form data:', this.formData);
    
    // Get current user
    const currentUser = this.authService.getUserRole();
    const createdBy = currentUser || 'unknown_user';
    
    // Prepare NPA data
    const npaData = {
      borrowerName: this.formData.borrowerName,
      npaDate: this.formData.npaDate,
      createdBy: createdBy
    };
    
    // Create NPA via API
    this.npaService.createNpa(npaData).subscribe({
      next: (response) => {
        console.log('NPA created successfully:', response);
        this.isSubmitting = false;
        
        // Get the actual ID from response
        const newNpaId = response.id;
        console.log('Redirecting to NPA detail page:', newNpaId);
        
        // Navigate to NPA detail page
        this.router.navigate(['/npa-detail', newNpaId]);
      },
      error: (error) => {
        console.error('Error creating NPA:', error);
        this.isSubmitting = false;
        
        if (error.status === 401) {
          alert('Please login to create NPA');
          this.router.navigate(['/login']);
        } else {
          alert('Error creating NPA. Please try again.');
        }
      }
    });
  }
}
