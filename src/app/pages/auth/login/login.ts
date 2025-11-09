import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { LocalizationService } from '../../../core/services/localization.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SelectModule,
    CheckboxModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    CardModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  email = '';
  password = '';
  rememberMe = false;

  langOptions: any[] = [];
  themeOptions: any[] = [];
  darkMode = false;

  selectedLang = 'en';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private localizationService: LocalizationService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadDropdownOptions();

    // Listen to language change
    this.translateService.onLangChange.subscribe(() => {
      this.loadDropdownOptions();
    });

    // Load defaults
    this.selectedLang = this.localizationService.currentLanguage || 'en';
    this.darkMode = this.themeService.isDarkMode();
  }

  loadDropdownOptions() {
    this.langOptions = [
      { label: this.translateService.instant('LANGUAGE.ENGLISH'), value: 'en' },
      { label: this.translateService.instant('LANGUAGE.GERMAN'), value: 'de' }
    ];

    this.themeOptions = [
      { label: this.translateService.instant('THEME.LIGHT'), value: false },
      { label: this.translateService.instant('THEME.DARK'), value: true }
    ];
  }

  login() {
    // TODO: implement login logic
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  setLanguage(lang: string) {
    this.selectedLang = lang;
    this.localizationService.setLanguage(lang);
  }

  toggleDarkMode(enabled: boolean) {
    this.darkMode = enabled;
    this.themeService.setDarkMode(enabled);
  }
}
