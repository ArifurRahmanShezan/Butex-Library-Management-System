import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-firm-order',
  templateUrl: './firm-order.component.html',
  styleUrls: ['./firm-order.component.css']
})
export class FirmOrderComponent {

   activeTab: string = 'form6';
  itemsTable: { itemName: string; quantity: number }[] = [{ itemName: '', quantity: 0 }];
  invoiceFileName: string = '';

  // Activities with detailed fields
  placeOrderActivities: { action: string, timestamp: string, item: string, vendor: string, quantity: number }[] = [];
  cancelOrderActivities: { action: string, timestamp: string, orderId: string, status: string, reason: string }[] = [];
  receiveOrderActivities: { action: string, timestamp: string, orderId: string, items: { itemName: string, quantity: number }[], invoice: string }[] = [];

  showForm(tab: string) {
    this.activeTab = tab;
  }

  addRow() {
    this.itemsTable.push({ itemName: '', quantity: 0 });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.invoiceFileName = file.name;
    }
  }

  submitForm(formName: string, form: any) {
    alert(`${formName} submitted successfully!`);
    const timestamp = new Date().toLocaleString();

    if (formName === 'Place Order') {
      const activity = {
        action: formName,
        timestamp,
        item: form.item,
        vendor: form.vendor,
        quantity: form.quantity
      };
      this.placeOrderActivities.unshift(activity);

    } else if (formName === 'Cancel/Reorder') {
      const activity = {
        action: formName,
        timestamp,
        orderId: form.orderId,
        status: form.status,
        reason: form.reason
      };
      this.cancelOrderActivities.unshift(activity);

    } else if (formName === 'Receive Order') {
      const activity = {
        action: formName,
        timestamp,
        orderId: form.orderId,
        items: [...this.itemsTable],
        invoice: this.invoiceFileName
      };
      this.receiveOrderActivities.unshift(activity);
      this.itemsTable = [{ itemName: '', quantity: 0 }];
      this.invoiceFileName = '';
    }
  }

  openInvoice(fileName: string) {
    alert(`Opening invoice: ${fileName}`);
  }
}




