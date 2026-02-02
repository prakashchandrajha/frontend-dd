import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NpaDetailComponent } from './components/npa-detail/npa-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'npa-detail/:id', component: NpaDetailComponent },
  { path: '**', redirectTo: 'login' }
];
