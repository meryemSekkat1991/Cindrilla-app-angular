import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  template: `<h1>Admin Dashboard</h1><p>Welcome, {{ auth.user()?.username }}</p>`
})
export class AdminDashboardComponent {
  auth = inject(AuthService);
}
