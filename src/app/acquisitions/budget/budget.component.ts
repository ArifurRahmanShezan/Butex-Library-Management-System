import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/api.service';
Chart.register(...registerables);

interface Allocation {
  head: string;
  amount: number;
  year: string;
}

interface Vendor {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
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
  vendorcontactPerson: string = '';
  vendorEmail: string = '';
  vendorPhone: string = '';
  vendorAddress: string = '';
  vendors: Vendor[] = [];

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

  editVendorIndex: number | null = null;
  editVendorId: number | null = null;

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

  


  



  deleteVendor(index: number) {
  const vendor = this.vendors[index];
  if (!confirm(`Are you sure you want to delete "${vendor.name}"?`)) return;

  this.api.deleteVendor(vendor.id).subscribe(
    () => {
      alert('Vendor deleted successfully!');
      this.loadVendor();
    },
    (err) => console.error('Error deleting vendor', err)
  );
}


  resetVendorForm() {
  this.vendorName = '';
  this.vendorcontactPerson = '';
  this.vendorEmail = '';
  this.vendorPhone = '';
  this.vendorAddress = '';
  this.editVendorIndex = null;
  this.editVendorId = null;
}



showVendorModal: boolean = false;

openVendorModal() {
  this.resetVendorForm();
  this.showVendorModal = true;
}

closeVendorModal() {
  this.resetVendorForm();
  this.showVendorModal = false;
}

addVendor() {
  const payload = {
    name: this.vendorName,
    contactPerson: this.vendorcontactPerson,
    email: this.vendorEmail,
    phone: this.vendorPhone,
    address: this.vendorAddress
  };

  if (this.editVendorId) {
    this.api.updateVendor(this.editVendorId, payload).subscribe(
      () => {
        alert('Vendor updated successfully!');
        this.loadVendor();
        this.closeVendorModal();
      },
      (err) => console.error('Error updating vendor', err)
    );
  } else {
    this.api.addVendor(payload).subscribe(
      () => {
        alert('Vendor added successfully!');
        this.loadVendor();
        this.closeVendorModal();
      },
      (err) => console.error('Error adding vendor', err)
    );
  }
}

editVendor(index: number) {
  const vendor = this.vendors[index];
  this.editVendorId = vendor.id;
  this.vendorName = vendor.name;
  this.vendorcontactPerson = vendor.contactPerson;
  this.vendorEmail = vendor.email;
  this.vendorPhone = vendor.phone;
  this.vendorAddress = vendor.address;
  this.showVendorModal = true;
}


}