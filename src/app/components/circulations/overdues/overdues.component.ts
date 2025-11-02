import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
interface Payment {
  patron: string;
  amount: number;
  method: 'Cash' | 'Card' | 'Online';
  date: string;
}
@Component({
  selector: 'app-overdues',
  templateUrl: './overdues.component.html',
  styleUrls: ['./overdues.component.css']
})
export class OverduesComponent {

  patronId: string = '';
  fineAmount: number | null = null;
  paymentMethod: 'Cash' | 'Card' | 'Online' | '' = '';

  payments: Payment[] = [];

  chart!: Chart;

  ngAfterViewInit() {
    const ctx = (document.getElementById('overdueChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      const config: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels: ['Cash', 'Card', 'Online'],
          datasets: [{
            label: 'Overdue Amounts',
            data: [0, 0, 0],
            backgroundColor: ['#00b894', '#0984e3', '#fdcb6e']
          }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
      };
      this.chart = new Chart(ctx, config);
    }
  }

  recordPayment() {
    if (!this.patronId || !this.fineAmount || !this.paymentMethod) {
      alert('Please fill all required fields.');
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    this.payments.push({
      patron: this.patronId,
      amount: this.fineAmount,
      method: this.paymentMethod as 'Cash' | 'Card' | 'Online',
      date
    });

    this.updateChart();
    alert('Payment recorded successfully.');

    this.patronId = '';
    this.fineAmount = null;
    this.paymentMethod = '';
  }

  updateChart() {
    const totals = { Cash: 0, Card: 0, Online: 0 };
    this.payments.forEach(p => { totals[p.method] += p.amount; });

    if (this.chart) {
      this.chart.data.datasets[0].data = [totals.Cash, totals.Card, totals.Online];
      this.chart.update();
    }
  }
}


