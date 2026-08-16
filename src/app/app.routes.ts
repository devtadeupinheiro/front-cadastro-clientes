import { Routes } from '@angular/router';
import { ClientsComponent } from '../app/pages/clients/clients.component/clients.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }
];
