import { Routes } from '@angular/router';
import { ClientsComponent } from '../app/pages/clients/clients.component/clients.component';
import { HomeComponent } from './home.component/home.component';
import { ServiceControlComponent } from '@pages/service-control/service-control.component/service-control.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'services-control', component: ServiceControlComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
