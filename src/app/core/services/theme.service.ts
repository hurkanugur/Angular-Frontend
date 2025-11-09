import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'themeMode';
  private darkModeClass = 'app-dark-mode';

  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor(private storage: StorageService) {
    this.initTheme();
  }

  /** Initialize theme from localStorage or default to light */
  private initTheme(): void {
    usePreset(Aura);

    const savedMode = this.storage.getLocal<ThemeMode>(this.STORAGE_KEY);
    const isDark = savedMode === 'dark';
    this.setDarkMode(isDark, false);
  }

  /** Enable or disable dark mode */
  setDarkMode(enabled: boolean, save: boolean = true) {
    if (enabled) {
      document.documentElement.classList.add(this.darkModeClass);
    } else {
      document.documentElement.classList.remove(this.darkModeClass);
    }
    this.darkModeSubject.next(enabled);
    if (save) {
      this.storage.setLocal(this.STORAGE_KEY, enabled ? 'dark' : 'light');
    }
  }

  /** Toggle dark mode */
  toggleDarkMode(): void {
    this.setDarkMode(!this.isDarkMode());
  }

  /** Check current mode */
  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
