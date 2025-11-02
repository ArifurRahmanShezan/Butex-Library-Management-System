import { Component } from '@angular/core';

interface LostItem {
  itemID: string;
  lossDate: string;
  cost: number;
}

@Component({
  selector: 'app-loss',
  templateUrl: './loss.component.html',
  styleUrls: ['./loss.component.css']
})
export class LossComponent {
  itemID: string = '';
  lossDate: string = '';
  cost: number | null = null;

  lostItems: LostItem[] = [];
  msg: string = '';
  msgClass: string = '';

  onSubmit() {
    if (!this.itemID || !this.lossDate || this.cost === null) {
      this.msg = 'Please fill all required fields!';
      this.msgClass = 'error';
      return;
    }

    this.lostItems.push({
      itemID: this.itemID,
      lossDate: this.lossDate,
      cost: this.cost
    });

    this.msg = 'Loss record successfully updated!';
    this.msgClass = 'success';

    this.itemID = '';
    this.lossDate = '';
    this.cost = null;

    setTimeout(() => this.msg = '', 2500);
  }
}
