import { Component } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ClientFormComponent } from '@app/shared/client-form.component/client-form.component';

@Component({
  selector: 'app-dialog-form-client.component',
  imports: [ReactiveFormsModule],
  templateUrl: './dialog-form-client.component.html',
  styleUrl: './dialog-form-client.component.scss',
})
export class DialogFormClientComponent extends ClientFormComponent {

  dialogClientSelectedId = this.clientSelectedId;

  dialogClientForm = this.clientForm;

  cancelEditionDialog(): void {
    this.cancelEdition();
  }

  override saveClient(): void {
    this.saveClient();
    this.matDialog.closeAll();
  }

  override deleteClient(clientId: number): void {
    this.deleteClient(clientId);
    this.matDialog.closeAll();
  }

  override editClient(clientId: number): void {
    this.editClient(clientId);
    this.matDialog.closeAll();
  }

  cnpjConsultDialog(cnpj: any): void {
    this.cnpjConsult(cnpj);
  }

  override resetForm(): void {
    this.resetForm();
  }

  closeMatDialog() {
    this.matDialog.closeAll();
  }

}
