import { Injectable, signal, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private ngZone = inject(NgZone);
  private http = inject(HttpClient);
  private router = inject(Router);

  user = signal<{ username: string; role: 'user' | 'admin' } | null>(null);


  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        try {
          this.user.set(JSON.parse(raw));
        } catch {}
      }
    }
  }

  // simulate server login using HttpClient but ensure we re-enter Angular zone
  login(username: string, password: string) {
    // fake request: in a real app call your API
    // we use setTimeout to simulate async and show NgZone usage
    return new Promise((resolve) => {
      // run the "network" outside Angular to avoid unnecessary change detection
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          const result = { username, role: username === 'admin' ? 'admin' : 'user' };
          // re-enter Angular zone to update signals and localStorage
          this.ngZone.run(() => {
            // @ts-ignore
            this.user.set(result);
            localStorage.setItem('auth_user', JSON.stringify(result));
            resolve(result);
          });
        }, 600);
      });
    });
  }

  register(username: string, password: string) {
    // simple fake register that just logs in
    return this.login(username, password);
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('auth_user');
    this.router.navigate(['/']);
  }

  isAdmin() {
    const u = this.user();
    return !!u && u.role === 'admin';
  }

  isLogged() {
    return !!this.user();
  }
}
