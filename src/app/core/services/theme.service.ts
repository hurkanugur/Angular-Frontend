import { Injectable } from '@angular/core';
import { updatePreset } from '@primeuix/themes';
import { ApplicationThemeConfig } from '../../themes/theme';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly COLOR_KEY = 'app-primary-palette';
  private readonly DARK_KEY = 'app-dark-mode';

  private currentPalette: string;
  private darkMode: boolean;

  constructor() {
    // Load from storage, else use environment defaults
    const storedPalette = localStorage.getItem(this.COLOR_KEY);
    const storedDark = localStorage.getItem(this.DARK_KEY);

    this.currentPalette = storedPalette || environment.defaultTheme;
    this.darkMode =
      storedDark !== null
        ? JSON.parse(storedDark)
        : environment.isDefaultDarkMode ?? false;

    // Apply once at app startup
    // this.applyTheme(this.currentPalette, this.darkMode);
    this.setDarkMode(this.darkMode)
    this.setPrimaryPalette(this.currentPalette)
  }

  /** Public getters */
  isDarkMode(): boolean {
    return this.darkMode;
  }

  getPrimaryPalette(): string {
    return this.currentPalette;
  }

  /** Toggles dark mode */
  setDarkMode(enabled: boolean): void {
    this.darkMode = enabled;
    document.documentElement.classList.toggle('app-dark-mode', enabled);
    localStorage.setItem(this.DARK_KEY, JSON.stringify(enabled));
  }

  /** Changes primary palette dynamically */
  setPrimaryPalette(colorName: string): void {
    this.currentPalette = colorName;
    localStorage.setItem(this.COLOR_KEY, colorName);
    this.updatePrimaryTokens(colorName);
  }

  /** Refreshes the theme */
  refreshTheme(): void {
    document.documentElement.classList.toggle('app-dark-mode', this.darkMode);
    this.updatePrimaryTokens(this.currentPalette);
  }

  /** Updates the preset tokens */
  private updatePrimaryTokens(colorName: string): void {
    const primitives = (ApplicationThemeConfig as any).primitive;
    const selected = primitives[colorName];

    if (!selected) {
      console.warn(
        `ThemeService: palette "${colorName}" not found in ApplicationThemeConfig.primitive`
      );
      return;
    }

    // Update only semantic.primary, rest of the preset remains unchanged
    updatePreset({
      semantic: {
        primary: {
          ...selected,
          color: selected[500],
          hover: selected[600],
          active: selected[700],
          focus: selected[400],
          highlight: selected[100],
        },
      },
    });
  }
}
