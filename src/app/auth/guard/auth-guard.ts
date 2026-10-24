import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 'autenticated' é um método que verifica se o usuário está logado (token válido), está com parênteses, pois é um signal
  if (authService.autenticated()) {
    return true; // Token existe, acesso liberado!
  }

  // Se não estiver logado, bloqueia o acesso e redireciona para o login
  return router.createUrlTree(['/login']);
};
