

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginPayload {
  email: string;
  phone: string;
  phoneCode: string;
  password: string;
  deviceToken: string;
  deviceType: string;
  deviceModel: string;
  appVersion: string;
  osVersion: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api =
    'https://dev-api.wanasti.com/api/v1/user/login?lang=en&currencyCode=KW';

  constructor(private http: HttpClient) {}

  //POST /user/login and persist the user object 
  login(payload: LoginPayload): Observable<any> {
    const headers = new HttpHeaders({
      auth: 'dAwMpo/TAWLhFrwwr3Wzcmc8XTdmAgp6zmGLsFmJ9HAnEbTQAg937i/hqKFjtFVQ4TnQ2y6xlVSeTKy3VWcxvalwvmPq6qF7+UcLd3wBXYoVQ2Puj49mTweKh/v2Rvj9zyVjfbexFkjMNZ5XyGucmdOI6XMmI98Zvu38Jh1fOo8157YxlgCozKkonixczjGIn3RKLuv7v3gXDRl4irzRcS6lYKGJB8vfA847GUppsVjdZV9bAjADfqUP2Iyl6Nz8MOWrSHNy8tWqhM6mI165rCwH3xMv7HEexmsMO7Mi36c=s',
      sessiontoken: '',          
    });

    return this.http.post(this.api, payload, { headers }).pipe(
      tap((res: any) => {
        // The user profile lives in res.data 
        const user = res.data;           
        localStorage.setItem('session', JSON.stringify(user));
      })
    );
  }
}
