import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly langKey = 'language';

  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) {
    const savedLang = this.storage.getLocal<string>(this.langKey) || this.translate.getFallbackLang() || 'en';
    this.setLanguage(savedLang);
  }

  /**
   * Get current language
   */
  get currentLanguage(): string {
    return this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en';
  }

  /**
   * Set a new language
   * Updates TranslateService and saves to storage
   */
  setLanguage(lang: string): void {
    if (lang === this.currentLanguage) return;

    this.translate.use(lang);
    this.storage.setLocal(this.langKey, lang);
    console.log("Active language:", lang)
  }
}
