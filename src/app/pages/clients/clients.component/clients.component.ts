import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/*
Include the following import statements in your TypeScript file to resolve the errors related to 'ClientService' and 'Client':
*/
//import { ClientService } from '../../../services/client.service';
//import { Client } from '../../../models/client';
import { ClientService } from '@services/client.service';
import { Client } from '@models/client';
import { DataCnpjDTO } from '@models/data-cnpj-dto';

@Component({
  selector: 'app-clients.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  
  clients: Client[] = []
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
    purchaseFrequency: [0, Validators.required]

  });

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getListClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
      (error: any) => {
        console.error('Error loading clients:', error);
      }
    );
  }

  saveClient(): void {

    if (this.clientForm.invalid) {

      this.clientForm.markAllAsTouched();
      return;

    }

    //const clientData: Client = this.clientForm.value;
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
      businessDistrict  : this.clientForm.value.businessDistrict || '',
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
      purchaseFrequency: this.clientForm.value.purchaseFrequency || 0
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
          }
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
          }
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
      }
    );
  }

  deleteClient(clientId: number): void {

    if(!clientId) {
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
        }
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

  cnpjSearch(cnpj: string): boolean {
    this.clientService.getClientByCnpj(cnpj).subscribe(
      (client: Client) => {
        if (client) {
          console.log('Client found:', client);
          this.clientForm.patchValue(client);
          return true;
        } else {
          console.log('Client not found');
          return false;
        }
      },
      (error: any) => {
        console.error('Error searching client by CNPJ:', error);
        return false;
      }
    );
    return false; // Default return value if the observable hasn't emitted yet
  }

  cnpjConsult(cnpj: any): void {
    
    if(!cnpj || cnpj === null || cnpj === undefined || typeof cnpj !== 'string' || cnpj.trim() === '') {
      console.error('CNPJ is null or undefined');
    }

    let cnpjTest: boolean = this.cnpjSearch(cnpj);
    if(!cnpjTest) {
      alert('CNPJ already registered.');
      console.error('CNPJ already registered.');
    } else {
      this.clientService.getDataCnpj(cnpj).subscribe(
      (data: DataCnpjDTO) => {
        console.log('CNPJ data:', data);
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
        (error: any) => {
          console.error('Error fetching CNPJ data:', error);
        }
      );       
    }

  }
}
