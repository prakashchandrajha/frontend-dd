import { Component } from '@angular/core';
import { NpaFormComponent } from '../../shared/npa-form/npa-form.component';
import { BasicDetailsOfTheBorrower1Component } from '../../shared/basic-details-of-the-borrower-1/basic-details-of-the-borrower-1.component';

@Component({
  selector: 'app-create-npa',
  standalone: true,
  imports: [NpaFormComponent, BasicDetailsOfTheBorrower1Component],
  templateUrl: './create-npa.component.html',
  styleUrls: ['./create-npa.component.css']
})
export class CreateNpaComponent {}
