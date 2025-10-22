import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  imports: [RouterOutlet, RouterLink]
})
export class PublicLayoutComponent {}
