import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-firm-order',
  templateUrl: './firm-order.component.html',
  styleUrls: ['./firm-order.component.css']
})
export class FirmOrderComponent {


  activeTab: string = 'form6';
  itemsTable: any[] = [{}];

  orderData: number[] = [5, 10, 7, 12];
  chart: any;

  showForm(tab: string) {
    this.activeTab = tab;
  }

  addRow() {
    this.itemsTable.push({});
  }

  submitForm(formName: string) {
    alert(`${formName} submitted successfully!`);
    this.orderData.push(Math.floor(Math.random() * 15) + 5);
    this.updateChart();
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Orders Fulfilled',
          data: this.orderData,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
    });
  }

  updateChart() {
    this.chart.data.labels.push('New');
    this.chart.data.datasets[0].data = this.orderData;
    this.chart.update();
  }
}


