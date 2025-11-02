import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit{
activeTab: string = 'form9';

  // Form Models
  solicit = { donorName: '', itemDescription: '', requestDate: '' };
  process = { giftId: '', decision: '', accessionNumber: '' };

  // Chart
  giftChart!: Chart;
  acceptedCount: number = 5;
  rejectedCount: number = 2;

  ngOnInit() {
    // Use setTimeout to ensure the canvas exists
    setTimeout(() => this.initChart(), 0);
  }

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }

  initChart() {
    const ctx = document.getElementById('giftChart') as HTMLCanvasElement;
    this.giftChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Accepted', 'Rejected'],
        datasets: [{
          data: [this.acceptedCount, this.rejectedCount],
          backgroundColor: ['#2b6777', '#e74c3c'],
          borderColor: '#fff',
          borderWidth: 2,
          hoverOffset: 12
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  handleSolicitGift() {
    alert('Gift solicitation submitted successfully!');
    this.solicit = { donorName: '', itemDescription: '', requestDate: '' };
  }

  handleProcessGift() {
    if (this.process.decision === 'Accepted') this.acceptedCount++;
    else this.rejectedCount++;

    this.updateChart();
    alert('Gift processed successfully!');
    this.process = { giftId: '', decision: '', accessionNumber: '' };
  }

  updateChart() {
    this.giftChart.data.datasets[0].data = [this.acceptedCount, this.rejectedCount];
    this.giftChart.update();
  }
}


