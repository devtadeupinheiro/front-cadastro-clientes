import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
