import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent {
activeTab: string = 'form9';

  // Form Models
  solicit = { donorName: '', itemDescription: '', requestDate: '' };
  process = { giftId: '', decision: '', accessionNumber: '' };

  // Activity Lists
  solicitGiftActivities: any[] = [];
  processGiftActivities: any[] = [];

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }

  handleSolicitGift() {
    const timestamp = new Date().toLocaleString();
    this.solicitGiftActivities.unshift({
      donorName: this.solicit.donorName,
      itemDescription: this.solicit.itemDescription,
      requestDate: this.solicit.requestDate,
      timestamp
    });

    alert('Gift solicitation submitted successfully!');
    this.solicit = { donorName: '', itemDescription: '', requestDate: '' };
  }

  handleProcessGift() {
    const timestamp = new Date().toLocaleString();
    this.processGiftActivities.unshift({
      giftId: this.process.giftId,
      decision: this.process.decision,
      accessionNumber: this.process.accessionNumber,
      timestamp
    });

    alert('Gift processed successfully!');
    this.process = { giftId: '', decision: '', accessionNumber: '' };
  }
}


