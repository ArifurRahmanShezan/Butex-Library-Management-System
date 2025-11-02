import { Component } from '@angular/core';
import { Chart } from 'chart.js';
interface Subscription {
  id: number;
  title: string;
  publisher: string;
  frequency: string;
}
interface Order {
  subId: string;
  vendor: string;
  date: string;
}
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {

  // Forms
  title: string = '';
  publisher: string = '';
  frequency: string = '';
  subId: string = '';
  vendor: string = '';
  orderDate: string = '';
  searchKeyword: string = '';

  subscriptions: Subscription[] = [];
  orders: Order[] = [];
  searchResults: Subscription[] = [];

  addMsg: string = '';
  orderMsg: string = '';

  // Add Subscription
  addSubscription() {
    if (!this.title || !this.publisher || !this.frequency) {
      return;
    }

    const id = this.subscriptions.length + 1;
    this.subscriptions.push({ id, title: this.title, publisher: this.publisher, frequency: this.frequency });
    this.addMsg = '✅ Subscription added successfully!';
    this.title = '';
    this.publisher = '';
    this.frequency = '';

    setTimeout(() => this.addMsg = '', 2000);
    this.updateChart();
  }

  // Search Subscription
  searchSubscription() {
    const keyword = this.searchKeyword.toLowerCase();
    this.searchResults = this.subscriptions.filter(s =>
      s.title.toLowerCase().includes(keyword) || s.publisher.toLowerCase().includes(keyword)
    );
  }

  // Place Order
  placeOrder() {
    if (!this.subId || !this.vendor || !this.orderDate) return;
    this.orders.push({ subId: this.subId, vendor: this.vendor, date: this.orderDate });
    this.orderMsg = '🧾 Order placed successfully!';
    this.subId = '';
    this.vendor = '';
    this.orderDate = '';

    setTimeout(() => this.orderMsg = '', 2000);
    this.updateChart();
  }

  // Chart
  chart: any;

  ngAfterViewInit() {
    const ctx = (document.getElementById('subscriptionChart') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Subscriptions', 'Orders'],
        datasets: [{
          label: 'Count',
          data: [0, 0],
          backgroundColor: ['#6366f1', '#10b981']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  updateChart() {
    if (!this.chart) return;
    this.chart.data.datasets[0].data = [this.subscriptions.length, this.orders.length];
    this.chart.update();
  }
}

