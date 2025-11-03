import { Component } from '@angular/core';

interface BindingRecord {
  type: string;
  details: string;
  date: string;
}

@Component({
  selector: 'app-serials-binding-management',
  templateUrl: './serials-binding-management.component.html',
  styleUrls: ['./serials-binding-management.component.css']
})
export class SerialsBindingManagementComponent {
  // Active tab
  activeTab: 'logical' | 'physical' | 'order' | 'receive' = 'logical';

  // Form fields
  logicalIssues = '';
  physicalVolumes = '';
  binder = '';
  orderDate = '';
  volumeID = '';
  receiveDate = '';

  // UI message
  msg = '';

  // Records
  bindingRecords: BindingRecord[] = [];

  // Switch tabs
  setTab(tab: 'logical' | 'physical' | 'order' | 'receive') {
    this.activeTab = tab;
  }

  private addRecord(type: string, details: string, date: string) {
    this.bindingRecords.unshift({ type, details, date }); // Add latest on top
  }

  private showMsg(text: string) {
    this.msg = text;
    setTimeout(() => (this.msg = ''), 2000);
  }

  submitLogical() {
    if (!this.logicalIssues.trim()) return;
    this.addRecord('Logical List', this.logicalIssues, new Date().toLocaleDateString());
    this.logicalIssues = '';
    this.showMsg('✅ Logical List submitted!');
  }

  submitPhysical() {
    if (!this.physicalVolumes.trim()) return;
    this.addRecord('Physical List', this.physicalVolumes, new Date().toLocaleDateString());
    this.physicalVolumes = '';
    this.showMsg('✅ Physical List submitted!');
  }

  submitOrder() {
    if (!this.binder.trim()) return;
    const date = this.orderDate || new Date().toLocaleDateString();
    this.addRecord('Order Placed', this.binder, date);
    this.binder = '';
    this.orderDate = '';
    this.showMsg('✅ Order placed!');
  }

  submitReceive() {
    if (!this.volumeID.trim()) return;
    const date = this.receiveDate || new Date().toLocaleDateString();
    this.addRecord('Received', this.volumeID, date);
    this.volumeID = '';
    this.receiveDate = '';
    this.showMsg('✅ Volume received!');
  }
}
