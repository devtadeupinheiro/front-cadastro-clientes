import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/*
Include the following import statements in your TypeScript file to resolve the errors related to 'ClientService' and 'Client':
*/
//import { ClientService } from '../../../services/client.service';
//import { Client } from '../../../models/client';
//import { ClientService } from '@services/client.service';
//import { Client } from '@models/client';
//import { DataCnpjDTO } from '@models/data-cnpj-dto';

//import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClientFormComponent } from '@app/shared/client-form.component/client-form.component';
import { DialogFormClientComponent } from '@app/dialogs/dialog-form-client.component/dialog-form-client.component';

@Component({
  selector: 'app-clients.component',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent extends ClientFormComponent implements OnInit {

  ngOnInit(): void {
    this.loadClients();
  }

  openDialogFormClient() {
    this.matDialog.open(DialogFormClientComponent, {
      width: '600px',
      height: '800px',
    });
  }


  
}
