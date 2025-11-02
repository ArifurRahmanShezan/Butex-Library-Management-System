import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Allocation {
  head: string;
  amount: number;
  year: string;
}
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {


  // Tabs
  activeTab: string = 'sources';

  // Budget Sources
  sourceName: string = '';
  sourceAmount: number | null = null;
  sources: { name: string, amount: number }[] = [];

  // Budget Heads
  headName: string = '';
  headDesc: string = '';
  heads: string[] = [];

  // Fiscal Years
  fiscalYear: string = '';
  fiscalStart: string = '';
  fiscalEnd: string = '';
  years: string[] = [];

  // Allocations
  allocHead: string = '';
  allocAmount: number | null = null;
  allocYear: string = '';
  allocations: Allocation[] = [];

  // Vendors
  vendorName: string = '';
  vendorContact: string = '';
  vendorAddress: string = '';
  vendors: { name: string, contact: string, address: string }[] = [];

  // Currencies
  currencyCode: string = '';
  currencyRate: number | null = null;
  currencies: { code: string, rate: number }[] = [];

  chart: any;

  ngOnInit(): void {
    this.initChart();
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  // Budget Source
  addSource() {
    if (!this.sourceName || this.sourceAmount == null) return;
    this.sources.push({ name: this.sourceName, amount: this.sourceAmount });
    this.sourceName = '';
    this.sourceAmount = null;
  }

  // Budget Head
  addHead() {
    if (!this.headName) return;
    this.heads.push(this.headName);
    this.headName = '';
    this.headDesc = '';
  }

  // Fiscal Year
  addFiscalYear() {
    if (!this.fiscalYear || !this.fiscalStart || !this.fiscalEnd) return;
    this.years.push(this.fiscalYear);
    this.fiscalYear = '';
    this.fiscalStart = '';
    this.fiscalEnd = '';
  }

  // Allocation
  addAllocation() {
    if (!this.allocHead || !this.allocAmount || !this.allocYear) return;
    this.allocations.push({ head: this.allocHead, amount: this.allocAmount, year: this.allocYear });
    this.allocAmount = null;
    this.allocHead = '';
    this.allocYear = '';
    this.updateChart();
  }

  // Vendor
  addVendor() {
    if (!this.vendorName) return;
    this.vendors.push({ name: this.vendorName, contact: this.vendorContact, address: this.vendorAddress });
    this.vendorName = '';
    this.vendorContact = '';
    this.vendorAddress = '';
  }

  // Currency
  addCurrency() {
    if (!this.currencyCode || !this.currencyRate) return;
    this.currencies.push({ code: this.currencyCode, rate: this.currencyRate });
    this.currencyCode = '';
    this.currencyRate = null;
  }

  // Chart.js
  initChart() {
    const ctx = document.getElementById('budgetChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{ label: 'Allocation Amount', data: [], backgroundColor: '#0984e3' }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  updateChart() {
    this.chart.data.labels = this.allocations.map(a => a.head);
    this.chart.data.datasets[0].data = this.allocations.map(a => a.amount);
    this.chart.update();
  }

}


