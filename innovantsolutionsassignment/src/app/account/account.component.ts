import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Local interface that matches the user object saved in localStorage 
export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  sessionToken?: string;      
  profilePicture?: string;
  address?: string;
  city?: string;
  country?: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  // User retrieved from localStorage 
  user: UserProfile | null = null;

  // Show spinner if you later fetch fresh data 
  loading = false;

  // Editable Personal Information form 
  profileForm = new FormGroup({
    firstName:       new FormControl('', Validators.required),
    lastName:        new FormControl('', Validators.required),
    email:           new FormControl('', [Validators.required, Validators.email]),
    phoneCode:       new FormControl(''),
    phone:           new FormControl(''),
    password:        new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Pull the stored user object 
    const stored = localStorage.getItem('session');
    if (stored) {
      this.user = JSON.parse(stored) as UserProfile;

      // Patch existing data into the form fields 
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName:  this.user.lastName,
        email:     this.user.email,
        phone:     this.user.phone,
        phoneCode: this.user.phoneCode,
      });
    }
  }

  // Convenience getters used in the template 
  get fullName(): string {
    return this.user
      ? `${this.user.firstName} ${this.user.lastName}`.trim()
      : '';
  }

  // Called when user clicks Save  
  saveProfile(): void {
    if (this.profileForm.invalid) return;
    // TODO : call backend PUT /user/updateProfile
    console.log('SAVE profile payload', this.profileForm.value);
  }

  // Log out and return to login 
  logout(): void {
    localStorage.removeItem('session');
    this.router.navigate(['/login']);
  }
}
