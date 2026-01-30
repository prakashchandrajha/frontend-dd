import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

 email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = '';

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      console.log('Login attempt:', { email: this.email, rememberMe: this.rememberMe });
    }, 2000);
  }

  socialLogin(provider: string) {
    console.log(`Logging in with ${provider}`);
  }
}