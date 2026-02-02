import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionalDocumentsWithNotes12Component } from '../../shared/additional-documents-with-notes-12/additional-documents-with-notes-12.component';
import { NpaService } from '../../services/npa.service';

@Component({
  selector: 'app-npa-detail',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ReactiveFormsModule, AdditionalDocumentsWithNotes12Component],
  templateUrl: './npa-detail.component.html',
  styleUrls: ['./npa-detail.component.css']
})
export class NpaDetailComponent implements OnInit {
  npaId: number | null = null;
  npaData: any = null;
  taskForm: FormGroup;
  isSubmitting = false;
  currentTask = 2; // Second task
  isLoading = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private npaService: NpaService,
    private cdr: ChangeDetectorRef
  ) {
    this.taskForm = this.fb.group({
      attachments: ['', Validators.required],
      notes: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.npaId = params['id'];
      console.log('NPA Detail - ID:', this.npaId);
      if (this.npaId) {
        // Force refresh the data
        this.loadNpaDetails(Number(this.npaId));
      }
    });
  }
  
  private loadNpaDetails(id: number) {
    this.isLoading = true;
    // Clear existing data to ensure fresh load
    this.npaData = null;
    this.npaService.getNpaById(id).subscribe({
      next: (data) => {
        console.log('NPA data loaded:', data);
        console.log('Setting npaData to:', data);
        this.npaData = data;
        console.log('npaData after assignment:', this.npaData);
        this.isLoading = false;
        // Trigger change detection
        this.cdr.detectChanges();
        setTimeout(() => {
          console.log('After timeout - npaData:', this.npaData);
          this.cdr.markForCheck();
        }, 0);
        // Update form with any existing data if needed
      },
      error: (error) => {
        console.error('Error loading NPA details:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        this.isLoading = false;
        // Handle error - maybe show error message or redirect
        if (error.status === 401) {
          alert('Please login to view NPA details');
          this.router.navigate(['/login']);
        } else if (error.status === 404) {
          alert(`NPA with ID ${id} not found`);
          this.router.navigate(['/dashboard']);
        } else {
          alert(`Error loading NPA details: ${error.status} - ${error.message}`);
        }
      }
    });
  }
  
  onSubmitTask() {
    if (this.taskForm.valid && this.npaId) {
      this.isSubmitting = true;
      console.log('Submitting task 2 form:', this.taskForm.value);
      
      // Make API call to complete the task
      const taskId = 'sample-task-id'; // This would come from the NPA data
      const variables = {
        attachments: this.taskForm.get('attachments')?.value,
        notes: this.taskForm.get('notes')?.value
      };
      
      this.npaService.completeTask(this.npaId, taskId, variables).subscribe({
        next: (response) => {
          console.log('Task completed successfully:', response);
          this.isSubmitting = false;
          alert('Task 2 completed successfully!');
          // Navigate to dashboard or next task
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error completing task:', error);
          this.isSubmitting = false;
          if (error.status === 401) {
            alert('Please login to complete this task');
            this.router.navigate(['/login']);
          } else {
            alert('Error completing task. Please try again.');
          }
        }
      });
    }
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload
      console.log('File selected:', file.name);
      this.taskForm.patchValue({
        attachments: file.name
      });
    }
  }
  
  onNavigate(view: string) {
    console.log('Navigate to:', view);
    switch (view) {
      case 'home':
        this.router.navigate(['/dashboard']);
        break;
      case 'profile':
        // Navigate to profile
        break;
      case 'createNpa':
        this.router.navigate(['/dashboard']);
        break;
      case 'npaList':
        this.router.navigate(['/dashboard']);
        break;
      case 'queue':
        this.router.navigate(['/dashboard']);
        break;
    }
  }
  
  onLogout() {
    // Clear token and redirect to login
    this.router.navigate(['/login']);
  }
}
