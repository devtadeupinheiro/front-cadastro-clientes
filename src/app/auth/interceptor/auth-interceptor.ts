import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  // Prepara a requisição (clonando com o token, se existir)
  let requestTratada = req;
  if (token) {
    requestTratada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Passa a requisição adiante e intercepta possíveis erros na volta
  return next(requestTratada).pipe(
    catchError((erro: HttpErrorResponse) => {
      // 401 significa que o token expirou, foi adulterado ou não existe
      if (erro.status === 401) {
        console.warn('Sessão expirada. Redirecionando para o login...');

        // Limpa o token do localStorage e atualiza o Signal global
        authService.logout();

        // Joga o usuário de volta para a tela inicial
        router.navigate(['/login']);
      }

      // Repassa o erro para frente caso o componente precise tratar (ex: exibir um toast)
      return throwError(() => erro);
    }),
  );
};
