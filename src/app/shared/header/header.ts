import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FaIconComponent],
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a routerLink="/" class="-m-1.5 p-1.5 flex items-center gap-2">
            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo">
            <span class="text-lg font-semibold text-gray-900">Cinderella</span>
          </a>
        </div>

        <div class="flex lg:hidden">
          <button type="button" (click)="toggleMenu()" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Open main menu</span>

            @if (!menuOpen()) {
              <i class="fa-solid fa-bars"></i>
            } @else {
              <fa-icon [icon]="faXmark"></fa-icon>
            }
          </button>
        </div>

        <div class="hidden lg:flex lg:gap-x-12">
          <a routerLink="/features" class="text-sm font-semibold text-gray-900 hover:text-indigo-600">Features</a>
          <a routerLink="/marketplace" class="text-sm font-semibold text-gray-900 hover:text-indigo-600">Marketplace</a>
          <a routerLink="/company" class="text-sm font-semibold text-gray-900 hover:text-indigo-600">Company</a>
        </div>

        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a routerLink="/login" class="text-sm font-semibold text-gray-900 hover:text-indigo-600">
            Log in <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <div class="lg:hidden absolute inset-x-0 top-16 z-40 bg-white border-t border-gray-200 shadow-lg">
          <div class="space-y-2 p-4">
            <a routerLink="/features" class="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Features</a>
            <a routerLink="/marketplace" class="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
            <a routerLink="/company" class="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Company</a>
            <a routerLink="/login" class="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
          </div>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  faXmark = faXmark;
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }
}
