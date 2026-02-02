import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-npa-detail',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './npa-detail.component.html',
  styleUrls: ['./npa-detail.component.css']
})
export class NpaDetailComponent implements OnInit {
  npaId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.npaId = params['id'];
      console.log('NPA Detail - ID:', this.npaId);
      // Here you would typically fetch the NPA details from the API
      // this.loadNpaDetails(this.npaId);
    });
  }
  
  onNavigate(view: string) {
    console.log('Navigate to:', view);
    switch (view) {
      case 'home':
        this.router.navigate(['/dashboard']);
        break;
      case 'profile':
        // Navigate to profile
        break;
      case 'createNpa':
        this.router.navigate(['/dashboard']);
        break;
      case 'npaList':
        this.router.navigate(['/dashboard']);
        break;
      case 'queue':
        this.router.navigate(['/dashboard']);
        break;
    }
  }
  
  onLogout() {
    // Clear token and redirect to login
    this.router.navigate(['/login']);
  }
}
