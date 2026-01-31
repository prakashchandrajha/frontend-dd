import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';

interface MenuItem {
  label: string;
  route?: string;
  icon: string;
  action?: string;
  badge?: number;
}

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, CreateUserModalComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);
  modalService = inject(ModalService);

  isCollapsed = false;
  isMobileOpen = false;
  currentDate = new Date();

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard', action: undefined },
    { label: 'Projects', route: '/projects', icon: 'projects', action: undefined },
    { label: 'Tasks', route: '/tasks', icon: 'tasks', action: undefined },
    { label: 'CreateUser', route: '/create-user', icon: 'team', action: 'openCreateUserModal' },
    { label: 'Messages', route: '/messages', icon: 'messages', badge: 3, action: undefined }
  ];

  analyticsItems = [
    { label: 'Reports', route: '/reports', icon: 'reports' },
    { label: 'Settings', route: '/settings', icon: 'settings' }
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
    document.body.style.overflow = this.isMobileOpen ? 'hidden' : '';
  }

  closeMobile() {
    this.isMobileOpen = false;
    document.body.style.overflow = '';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateTo(route: string | undefined, action?: string) {
    if (action === 'openCreateUserModal') {
      this.openCreateUserModal();
    } else if (route) {
      this.router.navigate([route]);
    }
  }

  openCreateUserModal() {
    this.modalService.openCreateUserModal();
  }
}
