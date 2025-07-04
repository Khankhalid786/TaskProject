import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotPasswordComponent {
  title = 'Reset Your Password';

  forgotForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  loading = false;
  submitted = false;

  get email() {
    return this.forgotForm.controls.email;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.forgotForm.invalid) return;

    this.loading = true;

    //This is for Api call If you have
    setTimeout(() => {
      alert(`A reset link has been sent to ${this.email.value}`);
      this.loading = false;
    }, 1200);
  }
}


