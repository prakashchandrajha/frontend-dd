import { Component } from '@angular/core';
import { NpaFormComponent } from '../../shared/npa-form/npa-form.component';

@Component({
  selector: 'app-create-npa',
  standalone: true,
  imports: [NpaFormComponent],
  templateUrl: './create-npa.component.html',
  styleUrls: ['./create-npa.component.css']
})
export class CreateNpaComponent {}
