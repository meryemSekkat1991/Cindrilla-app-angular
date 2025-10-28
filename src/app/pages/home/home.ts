import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  // Computed signals pour simplifier le template
  isAuthenticated = computed(() => !!this.authService.user());
  userRole = computed(() => this.authService.user()?.role ?? null);

  constructor(public authService: AuthService) {
    // Optionnel : réagir aux changements du signal
    effect(() => {
      console.log('User changed:', this.authService.user());
    });
  }

  logout() {
    this.authService.logout();
  }

  // Simuler login rapide (juste pour démo, tu peux appeler la vraie méthode login)
  loginAsClient() {
    this.authService.user.set({ email: 'client@test.com', role: 'USER' });
    localStorage.setItem('auth_user', JSON.stringify(this.authService.user()));
  }

  loginAsCoiffeur() {
    this.authService.user.set({ email: 'coiffeur@test.com', role: 'COIFFEUR' });
    localStorage.setItem('auth_user', JSON.stringify(this.authService.user()));
  }

  loginAsAdmin() {
    this.authService.user.set({ email: 'admin@test.com', role: 'ADMIN' });
    localStorage.setItem('auth_user', JSON.stringify(this.authService.user()));
  }
}
