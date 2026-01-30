import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule,RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
 isCollapsed = false;
  isMobileOpen = false;
  currentDate = new Date();

  menuItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Projects', route: '/projects', icon: 'projects' },
    { label: 'Tasks', route: '/tasks', icon: 'tasks' },
    { label: 'Team', route: '/team', icon: 'team' },
    { label: 'Messages', route: '/messages', icon: 'messages', badge: 3 }
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
}
