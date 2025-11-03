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
  years: { year: string, start: string, end: string }[] = [];

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

  ngOnInit(): void {
  
  // Demo Heads
  // this.heads = ['Salaries', 'Equipment', 'Travel', 'Training'];

  // // Demo Fiscal Years
  // this.years = [
  //   { year: '2023-2024', start: '2023-07-01', end: '2024-06-30' },
  //   { year: '2024-2025', start: '2024-07-01', end: '2025-06-30' }
  // ];
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
    this.years.push({ year: this.fiscalYear, start: this.fiscalStart, end: this.fiscalEnd });
    this.fiscalYear = '';
    this.fiscalStart = '';
    this.fiscalEnd = '';
  }

  // Allocation
addAllocation() {
  if (!this.allocHead || !this.allocAmount || !this.allocYear) return;

  this.allocations.push({
    head: this.allocHead,
    amount: this.allocAmount,
    year: this.allocYear  // Use the selected year string
  });

  // Clear input fields
  this.allocHead = '';
  this.allocAmount = null;
  this.allocYear = '';
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

}


