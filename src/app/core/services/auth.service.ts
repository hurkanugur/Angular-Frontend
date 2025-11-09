import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserCreate } from '../models/user-create.model';
import { UserInfo } from '../models/user-info.model';
import { Token } from '../models/token.model';
import { RefreshTokenRequest } from '../models/refresh-token-request.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  // BehaviorSubject to track current logged-in user
  private currentUserSubject: BehaviorSubject<UserInfo | null>;

  // Observable for components to subscribe to
  public currentUser$: Observable<UserInfo | null>;

  constructor(private http: HttpClient, private storage: StorageService) {
    // Initialize BehaviorSubject first
    const storedUser = this.storage.getLocal<UserInfo>('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserInfo | null>(storedUser);

    // Then initialize observable
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Register a new user
   */
  register(user: UserCreate): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${this.apiUrl}/register`, user);
  }

  /**
   * Login a user and store JWT + user info
   */
  login(user: UserCreate): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, user).pipe(
      switchMap((token: Token) => {
        // Store JWT tokens in session storage
        this.storage.setSession('access_token', token.access_token);
        this.storage.setSession('refresh_token', token.refresh_token);
        this.storage.setSession('token_type', token.token_type);

        // Fetch current user info from backend
        return this.getCurrentUser().pipe(
          map(userInfo => {
            if (userInfo) {
              this.storage.setLocal('currentUser', userInfo);
              this.currentUserSubject.next(userInfo);
            }
            return token;
          })
        );
      })
    );
  }

  /**
   * Logout the user
   */
  logout(): void {
    this.storage.removeLocal('currentUser');
    this.storage.removeSession('access_token');
    this.storage.removeSession('refresh_token');
    this.storage.removeSession('token_type');
    this.currentUserSubject.next(null);
  }

  /**
   * Refresh access token using refresh token
   */
  refreshToken(): Observable<Token | null> {
    const refreshToken = this.storage.getSession<string>('refresh_token');
    if (!refreshToken) {
      return of(null); // No refresh token available
    }

    const request: RefreshTokenRequest = { refresh_token: refreshToken };
    return this.http.post<Token>(`${this.apiUrl}/refresh`, request).pipe(
      map((token: Token) => {
        this.storage.setSession('access_token', token.access_token);
        this.storage.setSession('refresh_token', token.refresh_token);
        this.storage.setSession('token_type', token.token_type);
        return token;
      }),
      catchError(err => {
        console.error('Refresh token failed', err);
        this.logout(); // Logout user if refresh fails
        return of(null);
      })
    );
  }

  /**
   * Get current logged-in user info from backend
   */
  getCurrentUser(): Observable<UserInfo> {
    const accessToken = this.storage.getSession<string>('access_token');
    if (!accessToken) {
      return of(null as any);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.get<UserInfo>(`${environment.apiUrl}/users/me`, { headers }).pipe(
      catchError(err => {
        console.error('Failed to fetch current user', err);
        return of(null as any);
      })
    );
  }

  /**
   * Synchronous getter for current user value
   */
  public get currentUserValue(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  /**
   * Helper to get access token synchronously
   */
  public get accessToken(): string | null {
    return this.storage.getSession<string>('access_token');
  }
}