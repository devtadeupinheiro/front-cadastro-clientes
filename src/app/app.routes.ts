import { Routes } from '@angular/router';
import { ClientsComponent } from '../app/pages/clients/clients.component/clients.component';
import { HomeComponent } from './home.component/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
