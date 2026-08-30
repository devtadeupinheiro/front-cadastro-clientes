import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Client } from '@models/client';
import { ClientService } from '@services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataOutput } from '@app/dialogs/dialog-data-output/dialog-data-output';

@Component({
  selector: 'app-home.component',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected clientService = inject(ClientService);
  protected matDialog = inject(MatDialog);

  clients: Client[] = [];

  ngOnInit(): void {
    this.loadClientsNextBuy();
  }

  openDialogDataOutput(client: number) {
    this.matDialog.open(DialogDataOutput, {
      width: '600px',
      height: '800px',
      data: { idClient: client },
    });
  }

  loadClientsNextBuy(): void {
    this.clientService.getNextBuy().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
      (error: any) => {
        console.error('Error loading clients:', error);
      },
    );
  }
}
