import { Component } from '@angular/core';
interface Reservation {
  id: number;
  item: string;
  patron: string;
  date: string;
  status: string;
  reason?: string;
}
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent {

  placeItemId: string = '';
  placePatronId: string = '';
  placeDate: string = '';

  updateResId: number | null = null;
  updateDate: string = '';

  cancelResId: number | null = null;
  cancelReason: string = '';

  reservationCounter = 1;
  queue: Reservation[] = [];

  placeReservation() {
    if (!this.placeItemId || !this.placePatronId || !this.placeDate) {
      alert('⚠️ Please fill all required fields.');
      return;
    }

    this.queue.push({
      id: this.reservationCounter++,
      item: this.placeItemId,
      patron: this.placePatronId,
      date: this.placeDate,
      status: 'Active'
    });

    alert('Reservation placed successfully.');
    this.placeItemId = '';
    this.placePatronId = '';
    this.placeDate = '';
  }

  updateReservation() {
    const res = this.queue.find(r => r.id === this.updateResId);
    if (res && this.updateDate) {
      res.date = this.updateDate;
      alert('Reservation updated.');
      this.updateResId = null;
      this.updateDate = '';
    } else {
      alert('Reservation ID not found or date missing.');
    }
  }

  cancelReservation() {
    const res = this.queue.find(r => r.id === this.cancelResId);
    if (res) {
      res.status = 'Cancelled';
      res.reason = this.cancelReason || '';
      alert('Reservation cancelled.');
      this.cancelResId = null;
      this.cancelReason = '';
    } else {
      alert('Reservation ID not found.');
    }
  }
}


