import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  template: `<h1>User Dashboard</h1><p>Welcome, {{ auth.user() }}</p>`
})
export class DashboardComponent {
  auth = inject(AuthService);
}
