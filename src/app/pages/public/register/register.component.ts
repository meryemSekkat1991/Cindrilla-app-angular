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
    <div class="max-w-md mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-4">Inscription</h2>
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="nom" name="nom" class="w-full p-2 mb-2 border rounded" placeholder="Nom" required />
        <input [(ngModel)]="prenom" name="prenom" class="w-full p-2 mb-2 border rounded" placeholder="Prénom" required />
        <input [(ngModel)]="email" name="email" class="w-full p-2 mb-2 border rounded" placeholder="Email" required />
        <input [(ngModel)]="motDePasse" name="motDePasse" type="password" class="w-full p-2 mb-2 border rounded" placeholder="Mot de passe" required />
        <input [(ngModel)]="telephone" name="telephone" class="w-full p-2 mb-2 border rounded" placeholder="Téléphone" required />
        <input [(ngModel)]="adresse" name="adresse" class="w-full p-2 mb-2 border rounded" placeholder="Adresse" required />
        <select [(ngModel)]="role" name="role" class="w-full p-2 mb-2 border rounded">
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
        <button class="p-2 bg-green-600 text-white rounded w-full">S'inscrire</button>
      </form>
    </div>
  `
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
