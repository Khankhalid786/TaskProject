import { Component } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//  Group‑level validator 
function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const pwd  = group.get('password')?.value?.trim();
  const conf = group.get('confirmPassword')?.value?.trim();
  return pwd && conf && pwd !== conf ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],   
})
export class RegisterComponent {
  // Heading used in the template
  title = 'Create Your Account';

  //  Reactive form
  registerForm = new FormGroup(
    {
      fullName: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    },
    { validators: matchPasswords }        
  );

  // UI state flags
  submitted = false;
  loading   = false;

  constructor(private router: Router) {}

  // Convenience getters 
  get fullName()        { return this.registerForm.controls.fullName; }
  get email()           { return this.registerForm.controls.email; }
  get password()        { return this.registerForm.controls.password; }
  get confirmPassword() { return this.registerForm.controls.confirmPassword; }

  //  Submit handler 
  onSubmit(): void {
    this.submitted = true;

    // Stop if the form is invalid (includes mismatch error)
    if (this.registerForm.invalid) return;

    this.loading = true;

    // Simulate async save then navigate to /login
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/login');
    }, 600);
  }
}
