import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Client } from '../models/client';
import { DataCnpjDTO } from '../models/data-cnpj-dto';

@Service()
export class ClientService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/';

    getListClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiUrl}client`);
    }

    getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}client/id/${id}`);
    }

    getClientByCnpj(cnpj: string): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}client/cnpj/${cnpj}`);
    }

    createClient(client: Client): Observable<Client> {
        return this.http.post<Client>(`${this.apiUrl}client`, client);
    }

    updateClient(id: number, client: Client): Observable<Client> {
        return this.http.put<Client>(`${this.apiUrl}client/${id}`, client);
    }

    deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}client/${id}`);
    }

    getDataCnpj(cnpj: string): Observable<DataCnpjDTO> {
        return this.http.get<DataCnpjDTO>(`${this.apiUrl}client/consulta-cnpj/${cnpj}`);
    }

}
