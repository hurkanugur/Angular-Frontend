import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LocalizationService } from '../../core/services/localization.service';

@Component({
  selector: 'app-language-settings-button',
  standalone: true,
  imports: [CommonModule, PopoverModule, ButtonModule, TooltipModule, FormsModule, TranslatePipe],
  templateUrl: './language-settings-button.html',
  styleUrls: ['./language-settings-button.scss']
})
export class LanguageSettingsButton implements OnInit {
  env = environment;
  selectedLang = 'en';
  languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  constructor(
    private localizationService: LocalizationService,
    private translate: TranslateService
  ) {
    this.selectedLang = this.localizationService.getCurrentLanguage();
  }

  ngOnInit(): void {
    
  }

  selectLanguage(lang: string): void {
    this.selectedLang = lang;
    this.localizationService.setLanguage(lang);
  }
}
