import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="create-user-page">
      <h1>Create User</h1>
      <p>This page is used to create new users. Click on "CreateUser" in the sidebar to open the modal.</p>
    </div>
  `,
  styles: [`
    .create-user-page {
      padding: 20px;
    }

    .create-user-page h1 {
      color: #333;
      margin-bottom: 10px;
    }

    .create-user-page p {
      color: #666;
      margin-bottom: 20px;
    }
  `]
})
export class CreateUserComponent {
}