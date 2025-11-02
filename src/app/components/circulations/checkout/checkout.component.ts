import { Component } from '@angular/core';
interface LoanRecord {
  patronId: string;
  itemBarcode: string;
  loanPeriod: number;
  issueDate: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  patronId: string = '';
  itemBarcode: string = '';
  loanPeriod: number | null = null;
  activeLoans: LoanRecord[] = [];

  issueItem() {
    if (!this.patronId || !this.itemBarcode || !this.loanPeriod) {
      alert('⚠️ Please fill all required fields.');
      return;
    }

    const newLoan: LoanRecord = {
      patronId: this.patronId,
      itemBarcode: this.itemBarcode,
      loanPeriod: this.loanPeriod,
      issueDate: new Date().toLocaleDateString()
    };

    this.activeLoans.push(newLoan);

    alert(`Item ${this.itemBarcode} issued to Patron ${this.patronId} for ${this.loanPeriod} days.`);

    // Reset form fields
    this.patronId = '';
    this.itemBarcode = '';
    this.loanPeriod = null;
  }
}

