import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  // Public pages
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Dashboard (authenticated users only)
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },

  // Default redirect
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Wildcard redirect for unknown routes
  { path: '**', redirectTo: '/dashboard' }
];
