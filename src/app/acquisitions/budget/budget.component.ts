import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/api.service';
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
  vendorEmail: string = '';
  vendorPhone: string = '';
  vendorAddress: string = '';
  vendors: { name: string, contact: string, email :string, phone: string, address: string }[] = [];

  // Currencies
  currencyCode: string = '';
  currencyRate: number | null = null;
  currencies: { code: string, rate: number }[] = [];

  ngOnInit(): void {
  this.loadVendor();
  // Demo Heads
  // this.heads = ['Salaries', 'Equipment', 'Travel', 'Training'];

  // // Demo Fiscal Years
  // this.years = [
  //   { year: '2023-2024', start: '2023-07-01', end: '2024-06-30' },
  //   { year: '2024-2025', start: '2024-07-01', end: '2025-06-30' }
  // ];
}
  constructor(private api: ApiService) { }

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

 

  // Currency
  addCurrency() {
    if (!this.currencyCode || !this.currencyRate) return;
    this.currencies.push({ code: this.currencyCode, rate: this.currencyRate });
    this.currencyCode = '';
    this.currencyRate = null;
  }
   // Vendor
  loadVendor() {
  this.api.getAllVendor().subscribe(
    (res) => {
      this.vendors = res;   // assuming you have vendors: Vendor[] = [];
      console.log("Vendors loaded:", this.vendors);
    },
    (err) => {
      console.error("Error loading vendors", err);
    }
  );
}

addVendor() {
  const payload = {
    name: this.vendorName,
    contact: this.vendorContact,
    email: this.vendorEmail,
    phone: this.vendorPhone,
    address: this.vendorAddress
  };

  this.api.addVendor(payload).subscribe(
    (res) => {
      console.log('Vendor added successfully:', res);
      this.loadVendor();   // Load updated list

      // Clear form
      this.vendorName = '';
      this.vendorContact = '';
      this.vendorEmail = '';
      this.vendorPhone = '';
      this.vendorAddress = '';
    },
    (err) => {
      console.error('Error adding vendor', err);
    }
  );
}
editVendor(index: number) {
 this.api.getAllVendor().subscribe(
   (res) => {
     this.vendors = res;   // assuming you have vendors: Vendor[] = [];
     console.log("Vendors loaded:", this.vendors);
   },
   (err) => {
     console.error("Error loading vendors", err);
   }
 )
   
 
}


deleteVendor(index: number) {
  if (!confirm("Are you sure you want to delete this vendor?")) return;
  this.api.deleteVendor(index).subscribe(() => this.loadVendor());
}

// Track currently editing vendor
editVendorIndex: number | null = null;
}