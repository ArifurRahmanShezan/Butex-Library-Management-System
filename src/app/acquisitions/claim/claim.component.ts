import { Component } from '@angular/core';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent {

  modalVisible = false;

  searchText = '';
  sortColumn: string = '';
  sortDirection: string = '';

  claims = [
    { orderID: 'ORD-1001', reason: 'Item not delivered', date: '2025-10-10' },
    { orderID: 'ORD-1002', reason: 'Wrong item sent', date: '2025-10-12' }
  ];

  filteredClaims = [...this.claims];

  mainForm = { orderID: '', reason: '', date: '' };
  modalForm = { orderID: '', reason: '', date: '' };

  // ------- Modal ----------
  openModal() { this.modalVisible = true; }
  closeModal() { this.modalVisible = false; this.modalForm = { orderID:'',reason:'',date:'' }; }

  // ------- Submit Forms ------
  submitMainForm() {
    this.addClaim(this.mainForm);
    alert('Claim submitted! Email sent.');
    this.mainForm = { orderID:'',reason:'',date:'' };
  }

  submitModalForm() {
    this.addClaim(this.modalForm);
    alert('Claim submitted! Email sent.');
    this.closeModal();
  }

  addClaim(data: any) {
    this.claims.push({ ...data });
    this.filterTable(); // update UI search results
  }

  // ------- Search Filter ------
  filterTable() {
    const text = this.searchText.toLowerCase();
    this.filteredClaims = this.claims.filter(c =>
      c.orderID.toLowerCase().includes(text) ||
      c.reason.toLowerCase().includes(text)
    );
  }

  // ------- Sorting ------
  sortTable(column: string) {
    this.sortDirection = this.sortColumn === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;

    this.filteredClaims.sort((a: any, b: any) => {
      return this.sortDirection === 'asc'
        ? a[column].localeCompare(b[column])
        : b[column].localeCompare(a[column]);
    });
  }
}

