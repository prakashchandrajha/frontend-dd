import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-details-of-the-borrower-1',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './basic-details-of-the-borrower-1.component.html',
  styleUrl: './basic-details-of-the-borrower-1.component.css'
})
export class BasicDetailsOfTheBorrower1Component {
  @Output() formDataChange = new EventEmitter<any>();
  
  borrowerForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.borrowerForm = this.fb.group({
      borrowerName: ['', [Validators.required, Validators.minLength(2)]],
      npaDate: ['', Validators.required]
    });
    
    // Emit form data changes
    this.borrowerForm.valueChanges.subscribe(formData => {
      console.log('Borrower form value changed:', formData);
      this.formDataChange.emit(formData);
    });
  }
  
  get borrowerName() { return this.borrowerForm.get('borrowerName'); }
  get npaDate() { return this.borrowerForm.get('npaDate'); }
}
