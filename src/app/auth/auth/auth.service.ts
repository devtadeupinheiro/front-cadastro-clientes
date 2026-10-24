import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'jwt_token';
  private http = inject(HttpClient);

  // Angular 22: Signal que guarda o status de login para atualizar a UI instantaneamente
  autenticated = signal<boolean>(this.hasToken());

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
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.autenticated.set(false);
  }

  private hasToken(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }
}
