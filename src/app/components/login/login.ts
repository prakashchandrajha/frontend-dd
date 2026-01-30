import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;
    console.log('Login attempt:', {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    });
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      // Here you would typically call your authentication service
      alert(`Login attempted with username: ${this.username}`);
    }, 1500);
  }
}
