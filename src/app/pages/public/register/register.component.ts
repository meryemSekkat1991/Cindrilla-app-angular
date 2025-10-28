import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <div class="bg-white p-10 rounded-3xl shadow-2xl w-96 max-w-full animate-fadeIn">
        <h2 class="text-3xl font-extrabold mb-6 text-center text-purple-700 animate-bounce">Inscription</h2>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <input [(ngModel)]="nom" name="nom" placeholder="Nom" required
                 class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />

          <input [(ngModel)]="prenom" name="prenom" placeholder="Prénom" required
                 class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />

          <input [(ngModel)]="email" name="email" placeholder="Email" required
                 class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />

          <input [(ngModel)]="motDePasse" name="motDePasse" type="password" placeholder="Mot de passe" required
                 class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />

          <input [(ngModel)]="telephone" name="telephone" placeholder="Téléphone" required
                 class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />

          <input [(ngModel)]="adresse" name="adresse" placeholder="Adresse" required
                 class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />

          <select [(ngModel)]="role" name="role"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>

          <button type="submit"
                  class="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['register.compoent.scss']
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  nom = '';
  prenom = '';
  email = '';
  motDePasse = '';
  telephone = '';
  adresse = '';
  role = 'USER';

  async onSubmit() {
    try {
      const data = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        motDePasse: this.motDePasse,
        telephone: this.telephone,
        adresse: this.adresse,
        role: this.role
      };
      await this.auth.register(data);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      this.router.navigate(['/login']);
    } catch {
      alert("Erreur d'inscription, veuillez réessayer.");
    }
  }
}
