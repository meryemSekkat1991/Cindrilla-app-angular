import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {window} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
    imports: [RouterOutlet, CommonModule, RouterLink],
  providers: [AuthService]
})
export class UserLayoutComponent {
  protected readonly window = window;
}
