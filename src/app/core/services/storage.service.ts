import { Injectable } from '@angular/core';

/**
 * Service to abstract access to browser storage.
 * Provides helper methods for both localStorage and sessionStorage.
 * - localStorage: persistent storage (theme, language, user settings)
 * - sessionStorage: temporary storage (JWT tokens, session data)
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // =============================
  // Local Storage Methods
  // =============================

  /** Save a value to localStorage (persistent) */
  setLocal(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /** Retrieve a value from localStorage, parsed as type T */
  getLocal<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return null;
      }
    }
    return null;
  }

  /** Remove a key-value pair from localStorage */
  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  /** Clear all localStorage entries */
  clearLocal(): void {
    localStorage.clear();
  }

  // =============================
  // Session Storage Methods
  // =============================

  /** Save a value to sessionStorage (temporary) */
  setSession(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /** Retrieve a value from sessionStorage, parsed as type T */
  getSession<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (e) {
        console.error(`Error parsing sessionStorage key "${key}":`, e);
        return null;
      }
    }
    return null;
  }

  /** Remove a key-value pair from sessionStorage */
  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  /** Clear all sessionStorage entries */
  clearSession(): void {
    sessionStorage.clear();
  }
}