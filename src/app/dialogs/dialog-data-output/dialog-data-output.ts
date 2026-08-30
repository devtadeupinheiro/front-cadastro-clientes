import { KeyValuePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '@models/client';
import { ClientService } from '@services/client.service';

@Component({
  selector: 'app-dialog-data-output',
  imports: [KeyValuePipe],
  templateUrl: './dialog-data-output.html',
  styleUrl: './dialog-data-output.scss',
})
export class DialogDataOutput implements OnInit {
  clientData: Client | null = null;
  clientSelectedId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
  ) {
    this.clientSelectedId = this.data.idClient || this.data;
  }

  ngOnInit(): void {
    this.clientService.getClientById(this.clientSelectedId).subscribe((dados) => {
      this.clientData = dados;
    });
  }

  funcaoTeste() {
    console.log(this.data);
  }
}
