import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',   // racine de l'application
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/public/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'user',
    loadComponent: () => import('./layouts/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/user/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'Ho' }
];
