/* src/app/auth/login.component.ts */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService, LoginPayload } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'ENTER YOUR EMAIL TO CONTINUE';

  // reactive form
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  // UI state
  showPassword = false;
  loading = false;
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // getters for template
  get email()    { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // submit handler 
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const payload: LoginPayload = {
      email: this.email.value ?? '',
      phone: '',
      phoneCode: '965',
      password: this.password.value ?? '',
      deviceToken: '',
      deviceType: '',
      deviceModel: '',
      appVersion: '',
      osVersion: '',
    };

    this.auth.login(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/account']);
      },
      error: () => {
        this.loading = false;
        // Handle UI feedback for failed login here (e.g., toast/snackbar)
      },
    });
  }
}
