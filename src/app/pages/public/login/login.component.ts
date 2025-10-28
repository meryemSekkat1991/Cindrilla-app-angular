import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-4">Connexion</h2>
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="email" name="email" class="w-full p-2 mb-2 border rounded" placeholder="Email" required />
        <input [(ngModel)]="motDePasse" name="motDePasse" type="password" class="w-full p-2 mb-2 border rounded" placeholder="Mot de passe" required />
        <button class="p-2 bg-blue-600 text-white rounded w-full">Se connecter</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  motDePasse = '';

  async onSubmit() {
    try {
      await this.auth.login(this.email, this.motDePasse);
      const u = this.auth.user();
      if (u?.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    } catch {
      alert('Identifiants invalides ou problème de connexion.');
    }
  }
}
