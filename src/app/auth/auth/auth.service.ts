import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'jwt_token';
  private http = inject(HttpClient);

  // Angular 22: Signal que guarda o status de login para atualizar a UI instantaneamente
  autenticated = signal<boolean>(this.hasToken());

  loggedUser = signal<string | null>(this.extractUserFromToken(this.getToken()));

  login(credentials: { email: string; passwordUser: string }): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  register(data: {
    name: string;
    email: string;
    passwordUser: string;
  }): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/register`, data)
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.autenticated.set(true); // Atualiza o signal globalmente
    this.loggedUser.set(this.extractUserFromToken(token)); // Atualiza o signal com o e-mail logo após salvar o token
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.autenticated.set(false);
    this.loggedUser.set(null); // Limpa o e-mail do usuário ao fazer logout
  }

  private hasToken(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  private extractUserFromToken(token: string | null): string | null {
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.name || decodedToken.sub;
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return null;
    }
  }
}
