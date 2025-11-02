import { Component } from '@angular/core';

interface Binder {
  name: string;
  contact: string;
  type: string;
  price: number;
}

@Component({
  selector: 'app-binders',
  templateUrl: './binders.component.html',
  styleUrls: ['./binders.component.css']
})
export class BindersComponent {

  binderName: string = '';
  binderContact: string = '';
  bindType: string = '';
  bindPrice: number | null = null;
  binders: Binder[] = [];
  msg: string = '';

  submitBinder() {
    if (!this.binderName || !this.binderContact || !this.bindType || this.bindPrice === null) {
      this.msg = '⚠️ Please fill all fields.';
      return;
    }

    this.binders.push({
      name: this.binderName,
      contact: this.binderContact,
      type: this.bindType,
      price: this.bindPrice
    });

    this.msg = '✅ Binder added successfully!';
    this.binderName = '';
    this.binderContact = '';
    this.bindType = '';
    this.bindPrice = null;

    setTimeout(() => this.msg = '', 2000);
  }
}


