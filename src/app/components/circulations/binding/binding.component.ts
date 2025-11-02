import { Component } from '@angular/core';
interface BindingRecord {
  item: string;
  status: string;
  binder?: string;
  date?: string;
}
@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {

  // Forms models
  separationItems: string = '';
  checkoutItemId: string = '';
  checkoutBinder: string = '';
  recallItemId: string = '';
  recallDate: string = '';

  binders: string[] = ['ClassicBind Ltd.', 'Elite Binders', 'ProBind Services'];

  records: BindingRecord[] = [];

  submitSeparation() {
    const items = this.separationItems.split(',').map(i => i.trim()).filter(Boolean);
    items.forEach(item => this.records.push({ item, status: 'Separated' }));
    this.separationItems = '';
    alert('Separation process recorded successfully.');
  }

  submitCheckout() {
    if (!this.checkoutItemId || !this.checkoutBinder) return alert('Please enter item and select binder.');
    const rec = this.records.find(r => r.item === this.checkoutItemId);
    const today = new Date().toISOString().split('T')[0];
    if (rec) {
      rec.status = 'Sent to Binder';
      rec.binder = this.checkoutBinder;
      rec.date = today;
    } else {
      this.records.push({ item: this.checkoutItemId, status: 'Sent to Binder', binder: this.checkoutBinder, date: today });
    }
    this.checkoutItemId = '';
    this.checkoutBinder = '';
    alert('Item checked out to binder.');
  }

  submitRecall() {
    if (!this.recallItemId || !this.recallDate) return alert('Please enter item ID and date.');
    const rec = this.records.find(r => r.item === this.recallItemId);
    if (rec) {
      rec.status = 'Recalled';
      rec.date = this.recallDate;
      alert('Item recalled successfully.');
    } else {
      alert('Item not found in records.');
    }
    this.recallItemId = '';
    this.recallDate = '';
  }
}


