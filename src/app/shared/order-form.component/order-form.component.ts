import { ChangeDetectorRef, Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { OrderService } from '@services/order.service/order.service';
import { Order } from '@models/order';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-form.component',
  imports: [],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  protected fb = inject(FormBuilder);
  protected orderService = inject(OrderService);
  protected matDialog = inject(MatDialog);
  protected cdr = inject(ChangeDetectorRef);

  orders: Order[] = [];
  orderSelectedId: number | null = null;

  orderForm = this.fb.group({
    dataIda: ['', Validators.required],
    terceirizado: ['', Validators.required],
    quantidade: ['', Validators.required],
    peca: ['', Validators.required],
    preco: ['', Validators.required],
    total: ['', Validators.required],
    cliente: ['', Validators.required],
    pedido: ['', Validators.required],
    dataVolta: ['', Validators.required],
    dataPgto: ['', Validators.required],
    status: ['', Validators.required],
  });

  saveOrder(): Observable<Order> {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return throwError(() => new Error('FORM_INVALID'));
    }

    const orderData: Order = {
      dataIda: this.orderForm.value.dataIda || '',
      terceirizado: this.orderForm.value.terceirizado || '',
      quantidade: Number(this.orderForm.value.quantidade || 0),
      peca: this.orderForm.value.peca || '',
      preco: this.orderForm.value.preco || '',
      total: this.orderForm.value.total || '',
      cliente: this.orderForm.value.cliente || '',
      pedido: this.orderForm.value.pedido || '',
      dataVolta: this.orderForm.value.dataVolta || '',
      dataPgto: this.orderForm.value.dataPgto || '',
      status: this.orderForm.value.status || '',
    };

    if (this.orderSelectedId) {
      // Update existing order
      return this.orderService.updateOrder(this.orderSelectedId, orderData).pipe(
        tap({
          next: (updatedOrder: Order) => {
            console.log('Order updated:', updatedOrder);
            this.loadOrders();
            this.resetForm();
          },
          error: (error: any) => {
            console.error('Error updating order:', error);
          },
        }),
      );
    } else {
      // Create new order
      return this.orderService.createOrder(orderData).pipe(
        tap({
          next: (newOrder: Order) => {
            console.log('Order created:', newOrder);
            this.loadOrders();
            this.resetForm();
          },
          error: (error: any) => {
            console.error('Error creating order:', error);
          },
        }),
      );
    }
  }

  loadOrders(): void {
    this.orderService.getListOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error loading orders:', error);
      },
    );
  }

  resetForm(): void {
    this.orderForm.reset();
    this.orderSelectedId = null;
  }
}
