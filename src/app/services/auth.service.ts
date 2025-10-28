import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signal to store logged-in user info
  user = signal<{ email: string; role: string } | null>(null);

  // Backend base URL
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        try { this.user.set(JSON.parse(raw)); } catch {}
      }
    }
  }

  /** LOGIN using backend API **/
  // async login(email: string, motDePasse: string) {
  //   try {
  //     const result: any = await firstValueFrom(
  //         this.http.post(`${this.apiUrl}/login`, { email, motDePasse })
  //     );
  //
  //     // Backend returns: { accessToken, refreshToken }
  //     const token = result.accessToken;
  //     localStorage.setItem('token', token);
  //
  //     // Optional: request user info if your backend exposes /me endpoint
  //     this.user.set({ email, role: 'ADMIN' }); // or fetched role from backend
  //     localStorage.setItem('auth_user', JSON.stringify(this.user()));
  //
  //     return result;
  //   } catch (err) {
  //     console.error('Login failed', err);
  //     throw err;
  //   }
  // }


  async login(email: string, motDePasse: string) {
    try {
      const result: any = await firstValueFrom(
          this.http.post(`${this.apiUrl}/login`, { email, motDePasse })
      );

      const token = result.accessToken;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', token);
        this.user.set({ email, role: 'ADMIN' });
        localStorage.setItem('auth_user', JSON.stringify(this.user()));
      }

      return result;
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  }



  /** REGISTER a new user **/
  async register(data: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    telephone: string;
    adresse: string;
    role: string;
  }) {
    try {
      const result = await firstValueFrom(
          this.http.post(`${this.apiUrl}/register`, data)
      );
      return result;
    } catch (err) {
      console.error('Register failed', err);
      throw err;
    }
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLogged() {
    return !!this.user();
  }

  isAdmin() {
    const u = this.user();
    return !!u && u.role === 'ADMIN';
  }
}
