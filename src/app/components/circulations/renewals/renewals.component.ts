import { Component } from '@angular/core';
interface RenewalRecord {
  subId: string;
  date: string;
}
@Component({
  selector: 'app-renewals',
  templateUrl: './renewals.component.html',
  styleUrls: ['./renewals.component.css']
})
export class RenewalsComponent {

  subId: string = '';
  renewDate: string = '';
  renewals: RenewalRecord[] = [];
  msg: string = '';

  submitRenewal() {
    if (!this.subId || !this.renewDate) {
      this.msg = '⚠️ Please fill all required fields.';
      return;
    }

    this.renewals.push({ subId: this.subId, date: this.renewDate });
    this.msg = ' Subscription renewed successfully!';
    this.subId = '';
    this.renewDate = '';

    setTimeout(() => this.msg = '', 2000);
  }
}

