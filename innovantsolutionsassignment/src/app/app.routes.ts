import { Routes } from '@angular/router';

import { LoginComponent }    from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { authGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';


export const routes: Routes = [
  { path: '',        redirectTo: 'login', pathMatch: 'full' },

  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'account', component: AccountComponent,canActivate:[authGuard]},
  {path : 'forgot-password' , component: ForgotPasswordComponent},

  { path: '**', redirectTo: 'login' },   
];
