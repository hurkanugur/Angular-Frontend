import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule, Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SplitButtonModule, CheckboxModule, FormsModule, InputTextModule, ButtonModule, CommonModule, ReactiveFormsModule, TranslatePipe, CardModule, ButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  register() {
    // TODO: Implement registration logic
    console.log('Registering', this.fullName, this.email, this.password, this.confirmPassword);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
