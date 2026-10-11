import { Component, OnInit } from '@angular/core';
import { DialogFormOrder } from '@app/dialogs/dialog-form-order/dialog-form-order';
import { OrderFormComponent } from '@app/shared/order-form.component/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-control.component',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './service-control.component.html',
  styleUrl: './service-control.component.scss',
})
export class ServiceControlComponent extends OrderFormComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
  }

  openDialogFormOrder() {
    this.matDialog.open(DialogFormOrder, {
      width: '600px',
      height: '800px',
    });
  }

  /*
  Métodos abaixo devem passar para o orderFormComponent
  */
  editOrder(orderId: number): void {
    // Implement the logic to edit the order
  }

  deleteOrder(orderId: number): void {
    // Implement the logic to delete the order
  }
}
