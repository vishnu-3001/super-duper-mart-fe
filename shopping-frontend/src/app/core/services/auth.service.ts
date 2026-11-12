
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
}

export interface RegisterRequest{
    username:string;
    email:string;
    password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${environment.authBaseUrl}/auth/login`;
    return this.apiService
      .post<LoginResponse>(url, credentials)
      .pipe(
        tap(response => {
          sessionStorage.setItem('auth_token', response.token);
          sessionStorage.setItem(
            'role',
            response.role.toUpperCase()
          );
        })
      );
  }
  register(user: RegisterRequest): Observable<unknown> {
    return this.apiService.post<unknown>(`${environment.authBaseUrl}/auth/register`,user);
  }

  logout(): void {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('role');
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth_token');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getShoppingBaseUrl(): string {
    const role = this.getRole();
    const baseUrl = environment.shoppingBaseUrl.replace(/\/$/, '');
    if (role === 'USER') {
      return `${baseUrl}/user`;
    }
    if (role === 'ADMIN') {
      return `${baseUrl}/admin`;
    }
    throw new Error('User is not authenticated');
  }
}
