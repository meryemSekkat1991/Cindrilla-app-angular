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
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <div class="bg-white p-10 rounded-3xl shadow-2xl w-96 max-w-full animate-fadeIn">
        <h2 class="text-3xl font-extrabold mb-6 text-center text-purple-700 animate-bounce">Connexion</h2>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <input
            [(ngModel)]="email"
            name="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Email"
            required
          />
          <input
            [(ngModel)]="motDePasse"
            name="motDePasse"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Mot de passe"
            required
          />
          <button
            class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
            type="submit"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss']
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
