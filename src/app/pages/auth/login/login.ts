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
import { ThemeSettingsButton } from '../../../shared/theme-settings-button/theme-settings-button';
import { LanguageSettingsButton } from '../../../shared/language-settings-button/language-settings-button';

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
    CardModule,
    ThemeSettingsButton,
    LanguageSettingsButton
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  email = '';
  password = '';
  rememberMe = false;

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit() {

  }

  login() {
    // TODO: implement login logic
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
