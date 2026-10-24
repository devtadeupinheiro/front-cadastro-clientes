import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Expõe o Signal para o template ler
  autenticated = this.authService.autenticated;

  exit(): void {
    this.authService.logout(); // Limpa o token e muda o Signal para false
    this.router.navigate(['/login']); // Redireciona para a tela inicial
  }
}
