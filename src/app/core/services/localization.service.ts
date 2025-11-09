import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly LANG_KEY = 'app-language';
  private activeLanguage: string;

  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) {
    // Load from storage, else from environment default
    const storedLang: string | null = this.storage.getLocal<string>(this.LANG_KEY);
    this.activeLanguage = storedLang || environment.defaultLanguage;

    // Apply language immediately
    this.setLanguage(this.activeLanguage);
  }

  /** Get current language */
  getCurrentLanguage(): string {
    return this.activeLanguage;
  }

  /** Force re-apply current language (for startup or reinit) */
  refreshLanguage(): void {
    this.setLanguage(this.activeLanguage);
  }

  /** Set new language */
  setLanguage(lang: string): void {
    this.activeLanguage = lang;
    this.translate.use(lang);
    this.storage.setLocal(this.LANG_KEY, lang);
  }
}
