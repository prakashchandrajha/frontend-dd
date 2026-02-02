import { Component, EventEmitter, Output } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  
  currentView: 'home' | 'profile' | 'createUser' | 'createNpa' | 'npaDetail' | 'npaList' | 'queue' = 'home';

  constructor(public authService: AuthServiceService) {}

  showHome() {
    this.currentView = 'home';
    this.navigate.emit('home');
  }
  
  showProfile() {
    this.currentView = 'profile';
    this.navigate.emit('profile');
  }

  toggleUserForm() {
    this.currentView = 'createUser';
    this.navigate.emit('createUser');
  }

  showCreateNpa() {
    this.currentView = 'createNpa';
    this.navigate.emit('createNpa');
  }

  showNpaList() {
    this.currentView = 'npaList';
    this.navigate.emit('npaList');
  }

  showQueue() {
    this.currentView = 'queue';
    this.navigate.emit('queue');
  }

  onLogout() {
    this.logout.emit();
  }

  getCurrentUsername(): string {
    const token = this.authService.getToken();
    if (!token) return 'Unknown User';
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decoded = JSON.parse(jsonPayload);
      return decoded.sub || decoded.username || 'Unknown User';
    } catch (error) {
      console.error('Error decoding token for username:', error);
      return 'Unknown User';
    }
  }

  getCurrentUserDivision(): string {
    const token = this.authService.getToken();
    if (!token) return '';
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decoded = JSON.parse(jsonPayload);
      return decoded.divisionName || decoded.division || '';
    } catch (error) {
      console.error('Error decoding token for division:', error);
      return '';
    }
  }
}
