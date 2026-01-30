import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to track current theme
  currentTheme = signal<'dark' | 'light'>('dark');
  
  constructor() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      // Check system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.currentTheme.set(mediaQuery.matches ? 'dark' : 'light');
      
      // Listen for system changes (optional - removes user choice if system changes)
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.currentTheme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
    
    this.applyTheme(this.currentTheme());
    
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
      localStorage.setItem('theme', theme);
    });
  }
  
  toggleTheme() {
    this.currentTheme.update(theme => theme === 'dark' ? 'light' : 'dark');
  }
  
  setTheme(theme: 'dark' | 'light') {
    this.currentTheme.set(theme);
  }
  
  private applyTheme(theme: 'dark' | 'light') {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }
}