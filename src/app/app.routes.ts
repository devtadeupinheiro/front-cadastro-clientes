import { Routes } from '@angular/router';
import { ClientsComponent } from '../app/pages/clients/clients.component/clients.component';
import { HomeComponent } from './pages/home.component/home.component';
import { ServiceControlComponent } from '@pages/service-control/service-control.component/service-control.component';
import { QuoteComponent } from '@pages/quotes/quote/quote';
import { LoginComponent } from '../app/auth/login/login';
import { authGuard } from './auth/guard/auth-guard';

export const routes: Routes = [
  // Public routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Protected routes
  {
    path: '',
    canActivate: [authGuard], // Protected all routes with authGuard
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'services-control', component: ServiceControlComponent },
      { path: 'quote', component: QuoteComponent },
    ],
  },

  // Other routes that user try to access without login will be redirected to login page
  {
    path: '**',
    redirectTo: 'login',
  },
];
