import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // Call backend to check if user is authenticated
    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          return true; // User is authenticated
        } else {
          this.router.navigate(['/login']); // Not authenticated
          return false;
        }
      }),
      catchError(err => {
        console.error('AuthGuard error', err);
        this.router.navigate(['/login']); // On error, treat as unauthenticated
        return of(false);
      })
    );
  }
}
