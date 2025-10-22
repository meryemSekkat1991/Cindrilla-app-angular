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
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="username" name="username" class="w-full p-2 mb-2 border rounded" placeholder="username" />
      <input [(ngModel)]="password" name="password" type="password" class="w-full p-2 mb-2 border rounded" placeholder="password" />
      <button class="p-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  </div>
  `
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  username = '';
  password = '';

  async onSubmit() {
    await this.auth.login(this.username, this.password);
    // navigate based on role
    const u = this.auth.user();
    if (u?.role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }
}
