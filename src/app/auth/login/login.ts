import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    passwordUser: ['', Validators.required],
  });

  // Signal para lidar com o erro na tela de forma reativa
  errorMessage = signal<string>('');

  onSubmit(): void {
    if (this.loginForm.valid) {
      // getRawValue() extrai os dados mantendo a tipagem sem avisos de possível null
      const credenciais = this.loginForm.getRawValue();

      this.authService.login(credenciais).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage.set('E-mail ou senha inválidos. Tente novamente.');
        },
      });
    }
  }
}
