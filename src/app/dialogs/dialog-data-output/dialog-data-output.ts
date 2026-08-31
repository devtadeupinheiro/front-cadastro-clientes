import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientResumeOutput } from '@models/output/client-resume-output';
import { ClientService } from '@services/client.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-data-output',
  imports: [],
  templateUrl: './dialog-data-output.html',
  styleUrl: './dialog-data-output.scss',
})
export class DialogDataOutput implements OnInit {
  clientData: ClientResumeOutput | null = null;
  clientSelectedId: number;

  protected matDialog = inject(MatDialog);
  protected cdr = inject(ChangeDetectorRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
  ) {
    this.clientSelectedId = this.data.idClient || this.data;
  }

  ngOnInit(): void {
    this.clientService.getClientResumeOutputById(this.clientSelectedId).subscribe((dados) => {
      this.clientData = dados;
      this.cdr.detectChanges();
    });
  }

  closeDialog() {
    this.matDialog.closeAll();
  }
}
