import { Component, ViewChild } from '@angular/core';
import { BasicDetailsOfTheBorrower1Component } from '../basic-details-of-the-borrower-1/basic-details-of-the-borrower-1.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  
  constructor(private router: Router) {}
  
  onBorrowerFormDataChange(data: any) {
    console.log('Form data changed:', data);
    this.formData = { ...this.formData, ...data };
  }
  
  onSubmit() {
    console.log('=== onSubmit called ===');
    console.log('Form data:', this.formData);
    
    this.isSubmitting = true;
    console.log('Submitting NPA form data:', this.formData);
    
    // Here you would typically make an API call to save the NPA data
    // For now, we'll simulate a successful submission and redirect
    setTimeout(() => {
      this.isSubmitting = false;
      // Redirect to NPA detail page with the new NPA ID
      // In a real app, you would get the ID from the API response
      const newNpaId = 1; // This would come from the API response
      console.log('Redirecting to NPA detail page:', newNpaId);
      this.router.navigate(['/npa-detail', newNpaId]);
    }, 1000);
  }
}
