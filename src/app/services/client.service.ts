import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Client } from '../models/client';

@Service()
export class ClientService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/';

    getListClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiUrl}clients`);
    }

    getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}clients/${id}`);
    }

    createClient(client: Client): Observable<Client> {
        return this.http.post<Client>(`${this.apiUrl}clients`, client);
    }

    updateClient(id: number, client: Client): Observable<Client> {
        return this.http.put<Client>(`${this.apiUrl}clients/${id}`, client);
    }

    deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}clients/${id}`);
    }

}
