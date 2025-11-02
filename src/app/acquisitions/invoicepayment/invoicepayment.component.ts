import { Component } from '@angular/core';
interface Payment {
  invoiceID: string;
  amount: number;
  date: string;
  method: string;
  notes: string;
}
type SortablePayment = Payment & {
  [key: string]: any;
}
@Component({
  selector: 'app-invoicepayment',
  templateUrl: './invoicepayment.component.html',
  styleUrls: ['./invoicepayment.component.css']
})
export class InvoicepaymentComponent {
  rows: Payment[] = [
    { invoiceID: 'INV-1001', amount: 5000, date: '2025-10-10', method: 'Cash', notes: 'Paid in full' },
    { invoiceID: 'INV-1002', amount: 7500, date: '2025-10-12', method: 'Bank Transfer', notes: 'Partial' },
    { invoiceID: 'INV-1003', amount: 3000, date: '2025-10-13', method: 'Credit Card', notes: 'Paid via card' },
    { invoiceID: 'INV-1004', amount: 4500, date: '2025-10-14', method: 'Mobile Payment', notes: 'Mobile transaction' },
  ];

  filteredRows: Payment[] = [...this.rows];

  searchText: string = '';
  filterMethod: string = '';
  showModal: boolean = false;

  newPayment: Payment = {
    invoiceID: '',
    amount: 0,
    date: '',
    method: '',
    notes: ''
  };

  // Open/Close modal
  openModal() { this.showModal = true; }
  closeModal() {
    this.showModal = false;
    this.newPayment = { invoiceID: '', amount: 0, date: '', method: '', notes: '' };
  }

  // Add new payment
  addPayment() {
    if (!this.newPayment.amount) this.newPayment.amount = 0; // Ensure number
    this.rows.push({ ...this.newPayment });
    this.filterTable();
    this.closeModal();
  }

  // Filter table
  filterTable() {
    const search = this.searchText.toLowerCase();
    this.filteredRows = this.rows.filter(row => {
      const matchSearch = row.invoiceID.toLowerCase().includes(search) || row.notes.toLowerCase().includes(search);
      const matchMethod = !this.filterMethod || row.method === this.filterMethod;
      return matchSearch && matchMethod;
    });
  }

  // Sort table
  sortColumn: keyof Payment | '' = '';
  sortDir: 'asc' | 'desc' = 'asc';

  sortTable(column: keyof Payment) {
    if (this.sortColumn === column) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDir = 'asc';
    }

    const dir = this.sortDir === 'asc' ? 1 : -1;

    this.filteredRows.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * dir;
      }

      return String(aValue).localeCompare(String(bValue)) * dir;
    });
  }
}





