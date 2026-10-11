import { Component } from '@angular/core';
import { OrderFormComponent } from '@app/shared/order-form.component/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-form-order',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dialog-form-order.html',
  styleUrl: './dialog-form-order.scss',
})
export class DialogFormOrder extends OrderFormComponent {
  dialogOrderSelectedId = this.orderSelectedId;

  dialogOrderForm = this.orderForm;

  saveCompleteOrder(): void {
    super.saveOrder().subscribe({
      next: (saveOrder) => {
        alert('Ordem salva com sucesso!');
        this.matDialog.closeAll();
      },
      error: (error) => {
        if (error.message === 'FORM_INVALID') {
          alert(
            'Formulário inválido. Por favor, preencha todos os campos obrigatórios ou corrija os valores.',
          );
        } else {
          console.error('Error saving order:', error);
        }
      },
    });
  }
}
