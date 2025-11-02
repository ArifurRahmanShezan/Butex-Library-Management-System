import { Component } from '@angular/core';
interface LostItem {
  itemID: string;
  lossDate: string;
  cost: number;
}
@Component({
  selector: 'app-request-processing',
  templateUrl: './request-processing.component.html',
  styleUrls: ['./request-processing.component.css']
})
export class RequestProcessingComponent {
  loss: LostItem = { itemID: '', lossDate: '', cost: 0 };
  lostItems: LostItem[] = [];
  message = '';
  messageClass = '';

  onSubmit() {
    if (!this.loss.itemID || !this.loss.lossDate || !this.loss.cost) {
      this.message = 'Please fill all required fields!';
      this.messageClass = 'error';
      this.clearMessage();
      return;
    }

    this.lostItems.push({ ...this.loss });
    this.message = 'Loss record successfully updated!';
    this.messageClass = 'success';
    this.loss = { itemID: '', lossDate: '', cost: 0 };

    this.clearMessage();
  }

  clearMessage() {
    setTimeout(() => {
      this.message = '';
      this.messageClass = '';
    }, 2500);
  }
}


