import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../models/user-info.model';
import { UserCreate } from '../models/user-create.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private storage: StorageService) {}

  /** Helper: attach JWT to headers */
  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getSession<string>('access_token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  /** Get current authenticated user */
  getCurrentUser(): Observable<UserInfo | null> {
    const headers = this.getAuthHeaders();
    if (!headers.get('Authorization')) {
      return of(null);
    }

    return this.http.get<UserInfo>(`${this.apiUrl}/me`, { headers }).pipe(
      catchError(err => {
        console.error('Failed to fetch current user', err);
        return of(null);
      })
    );
  }

  /** List all users (admin only) */
  listUsers(): Observable<UserInfo[] | null> {
    const headers = this.getAuthHeaders();
    if (!headers.get('Authorization')) {
      return of(null);
    }

    return this.http.get<UserInfo[]>(`${this.apiUrl}/`, { headers }).pipe(
      catchError(err => {
        console.error('Failed to fetch users', err);
        return of([]);
      })
    );
  }

  /** Update current user's profile */
  updateCurrentUser(updatedData: UserCreate): Observable<UserInfo | null> {
    const headers = this.getAuthHeaders();
    if (!headers.get('Authorization')) {
      return of(null);
    }

    return this.http.put<UserInfo>(`${this.apiUrl}/me`, updatedData, { headers }).pipe(
      catchError(err => {
        console.error('Failed to update user', err);
        return of(null);
      })
    );
  }

  /** Delete current user's profile */
  deleteCurrentUser(): Observable<{ detail: string } | null> {
    const headers = this.getAuthHeaders();
    if (!headers.get('Authorization')) {
      return of(null);
    }

    return this.http.delete<{ detail: string }>(`${this.apiUrl}/me`, { headers }).pipe(
      catchError(err => {
        console.error('Failed to delete user', err);
        return of(null);
      })
    );
  }
}
