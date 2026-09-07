import { Component } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ClientFormComponent } from '@app/shared/client-form.component/client-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormControl } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${year}`;
    }
    return date.toLocaleDateString(this.locale, { month: 'short', year: 'numeric' });
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-form-client.component',
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './dialog-form-client.component.html',
  styleUrl: './dialog-form-client.component.scss',
})
export class DialogFormClientComponent extends ClientFormComponent {
  dialogClientSelectedId = this.clientSelectedId;

  dialogClientForm = this.clientForm;

  cancelEditionDialog(): void {
    this.cancelEdition();
  }

  saveCompleteClient(): void {
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
    this.dialogClientForm.reset();
  }

  closeMatDialog() {
    this.matDialog.closeAll();
  }

  onCheckboxChange(checked: boolean): void {
    const purchaseControl = this.dialogClientForm.get('purchaseFrequency');

    if (checked) {
      purchaseControl?.disable();
      this.dialogClientForm.get('purchaseFrequency')?.setValue(1);
    } else {
      purchaseControl?.enable();
    }
  }

  dateControl = new FormControl(new Date());
  maxDate = new Date();
  chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
    this.dateControl.setValue(normalizedMonth);
    datepicker.close();
  }
}
