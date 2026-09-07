import { ChangeDetectorRef, Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from '@services/client.service';
import { Client } from '@models/client';
import { DataCnpjDTO } from '@models/data-cnpj-dto';
import { catchError, map, Observable, of } from 'rxjs';

import { isCNPJ } from 'validation-br';

@Component({
  selector: 'app-client-form.component',
  imports: [],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent {
  protected fb = inject(FormBuilder);
  protected clientService = inject(ClientService);
  protected matDialog = inject(MatDialog);
  protected cdr = inject(ChangeDetectorRef);

  clients: Client[] = [];
  clientSelectedId: number | null = null;

  clientForm = this.fb.group({
    cnpj: ['', Validators.required],
    cep: ['', Validators.required],
    stateRegistration: ['', Validators.required],
    companyName: ['', Validators.required],
    tradingName: ['', Validators.required],
    group: ['', Validators.required],
    billingStreet: ['', Validators.required],
    billingHouseNumber: ['', Validators.required],
    billingDistrict: ['', Validators.required],
    billingCity: ['', Validators.required],
    billingState: ['', Validators.required],
    billingContact: ['', Validators.required],
    billingPhoneNumber: ['', Validators.required],
    billingEmail: ['', [Validators.required, Validators.email]],
    businessStreet: ['', Validators.required],
    businessHouseNumber: ['', Validators.required],
    businessDistrict: ['', Validators.required],
    businessCity: ['', Validators.required],
    businessState: ['', Validators.required],
    businessContact: ['', Validators.required],
    businessPhoneNumber: ['', Validators.required],
    businessEmail: ['', [Validators.required, Validators.email]],
    deliveryStreet: ['', Validators.required],
    deliveryHouseNumber: ['', Validators.required],
    deliveryDistrict: ['', Validators.required],
    deliveryCity: ['', Validators.required],
    deliveryState: ['', Validators.required],
    deliveryContact: ['', Validators.required],
    deliveryPhoneNumber: ['', Validators.required],
    deliveryEmail: ['', [Validators.required, Validators.email]],
    deliveryTime: ['', Validators.required],
    purchaseFrequency: [0, Validators.required],
    lastBuy: ['', Validators.required],
  });

  loadClients(): void {
    this.clientService.getListClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error loading clients:', error);
      },
    );
  }

  saveClient(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const dateSelected: Date | null = this.clientForm.value.lastBuy
      ? new Date(this.clientForm.value.lastBuy)
      : null;
    if (dateSelected) {
      const year = dateSelected.getFullYear();
      const month = (dateSelected.getMonth() + 1).toString().padStart(2, '0');
      const ISOFormatDate = `${year}-${month}`;
    }
    const clientData: Client = {
      cnpj: this.clientForm.value.cnpj || '',
      cep: this.clientForm.value.cep || '',
      stateRegistration: this.clientForm.value.stateRegistration || '',
      companyName: this.clientForm.value.companyName || '',
      tradingName: this.clientForm.value.tradingName || '',
      group: this.clientForm.value.group || '',
      billingStreet: this.clientForm.value.billingStreet || '',
      billingHouseNumber: this.clientForm.value.billingHouseNumber || '',
      billingDistrict: this.clientForm.value.billingDistrict || '',
      billingCity: this.clientForm.value.billingCity || '',
      billingState: this.clientForm.value.billingState || '',
      billingContact: this.clientForm.value.billingContact || '',
      billingPhoneNumber: this.clientForm.value.billingPhoneNumber || '',
      billingEmail: this.clientForm.value.billingEmail || '',
      businessStreet: this.clientForm.value.businessStreet || '',
      businessHouseNumber: this.clientForm.value.businessHouseNumber || '',
      businessDistrict: this.clientForm.value.businessDistrict || '',
      businessCity: this.clientForm.value.businessCity || '',
      businessState: this.clientForm.value.businessState || '',
      businessContact: this.clientForm.value.businessContact || '',
      businessPhoneNumber: this.clientForm.value.businessPhoneNumber || '',
      businessEmail: this.clientForm.value.businessEmail || '',
      deliveryStreet: this.clientForm.value.deliveryStreet || '',
      deliveryHouseNumber: this.clientForm.value.deliveryHouseNumber || '',
      deliveryDistrict: this.clientForm.value.deliveryDistrict || '',
      deliveryCity: this.clientForm.value.deliveryCity || '',
      deliveryState: this.clientForm.value.deliveryState || '',
      deliveryContact: this.clientForm.value.deliveryContact || '',
      deliveryPhoneNumber: this.clientForm.value.deliveryPhoneNumber || '',
      deliveryEmail: this.clientForm.value.deliveryEmail || '',
      deliveryTime: this.clientForm.value.deliveryTime || '',
      purchaseFrequency: this.clientForm.value.purchaseFrequency || 0,
      lastBuy: this.clientForm.value.lastBuy?.toString() || '',
    };

    if (this.clientSelectedId) {
      // Update existing client
      this.clientService.updateClient(this.clientSelectedId, clientData).subscribe(
        (updatedClient: Client) => {
          console.log('Client updated:', updatedClient);
          this.loadClients();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating client:', error);
        },
      );
    } else {
      // Create new client
      this.clientService.createClient(clientData).subscribe(
        (newClient: Client) => {
          console.log('Client created:', newClient);
          this.loadClients();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error creating client:', error);
        },
      );
    }
  }

  editClient(clientId: number): void {
    this.clientSelectedId = clientId;
    this.clientService.getClientById(clientId).subscribe(
      (client: Client) => {
        this.clientForm.patchValue(client);
      },
      (error: any) => {
        console.error('Error loading client for edit:', error);
      },
    );
  }

  deleteClient(clientId: number): void {
    if (!clientId) {
      console.error('Client ID is null or undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(clientId).subscribe(
        () => {
          console.log('Client deleted');
          this.loadClients();
          if (this.clientSelectedId === clientId) {
            this.resetForm();
          }
        },
        (error: any) => {
          console.error('Error deleting client:', error);
        },
      );
    }
  }

  resetForm(): void {
    this.clientForm.reset();
    this.clientSelectedId = null;
  }

  cancelEdition(): void {
    this.resetForm();
  }

  cnpjValidation(cnpj: string): boolean {
    const cnpjValid = isCNPJ(cnpj);
    return cnpjValid;
  }

  cnpjSearch(cnpj: string): Observable<boolean> {
    return this.clientService.getClientByCnpj(cnpj).pipe(
      map((client: Client) => {
        if (client) {
          return true;
        } else {
          console.log('Client not found'); //Apagar linha
          return false;
        }
      }),
      catchError((error) => {
        if (error.status === 404) {
          console.log('Client not found'); //Apagar linha
          return of(false);
        }
        console.error('Error searching client by Cnpj:', error);
        return of(false);
      }),
    );
  }

  cnpjConsult(cnpj: any): void {
    if (
      !cnpj ||
      cnpj === null ||
      cnpj === undefined ||
      typeof cnpj !== 'string' ||
      cnpj.trim() === ''
    ) {
      console.error('CNPJ is null or undefined');
      return;
    }

    const cnpjValidationTest: boolean = this.cnpjValidation(cnpj);
    if (!cnpjValidationTest) {
      alert('CNPJ inválido, tente novamente');
      console.log('CNPJ inválido');
      return;
    }

    const cnpjFormatted = cnpj.trim().replace(/[^a-zA-Z0-9]/g, '');
    this.cnpjSearch(cnpjFormatted).subscribe((cnpjTest: boolean) => {
      if (cnpjTest) {
        alert('CNPJ já cadastrado!');
        this.resetForm();
      } else {
        this.clientService.getDataCnpj(cnpjFormatted).subscribe({
          next: (data: DataCnpjDTO) => {
            this.clientForm.patchValue({
              cnpj: data.cnpj,
              billingState: data.uf,
              cep: data.cep,
              billingDistrict: data.bairro,
              billingHouseNumber: data.numero + ', ' + data.complemento,
              billingCity: data.municipio,
              billingStreet: data.logradouro,
              companyName: data.razao_social,
              tradingName: data.nome_fantasia,
            });
          },
          error: (error: any) => {
            if (error.status === 404) {
              alert('CNPJ não encontrado na base de dados da Receita Federal.');
            } else {
              alert('Erro ao consultar CNPJ. Por favor, tente novamente mais tarde.');
            }
          },
        });
      }
    });
  }
}
