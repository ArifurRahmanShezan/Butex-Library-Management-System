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
  // Form models
  logicalIssues: string = '';
  physicalVolumes: string = '';
  binder: string = '';
  orderDate: string = '';
  volumeID: string = '';
  receiveDate: string = '';

  msg: string = '';
  bindingRecords: BindingRecord[] = [];

  totalStages: number = 4;
  completedStages: number = 0;

  get progress(): number {
    return Math.round((this.completedStages / this.totalStages) * 100);
  }

  private addRecord(type: string, details: string, date: string) {
    this.bindingRecords.push({ type, details, date });
  }

  submitLogical() {
    if(!this.logicalIssues) return;
    this.addRecord('Logical List', this.logicalIssues, new Date().toLocaleDateString());
    this.logicalIssues = '';
    this.completedStages++;
    this.showMsg('✅ Logical List submitted!');
  }

  submitPhysical() {
    if(!this.physicalVolumes) return;
    this.addRecord('Physical List', this.physicalVolumes, new Date().toLocaleDateString());
    this.physicalVolumes = '';
    this.completedStages++;
    this.showMsg('✅ Physical List submitted!');
  }

  submitOrder() {
    if(!this.binder) return;
    const date = this.orderDate || new Date().toLocaleDateString();
    this.addRecord('Order Placed', this.binder, date);
    this.binder = '';
    this.orderDate = '';
    this.completedStages++;
    this.showMsg('✅ Order placed!');
  }

  submitReceive() {
    if(!this.volumeID) return;
    const date = this.receiveDate || new Date().toLocaleDateString();
    this.addRecord('Received', this.volumeID, date);
    this.volumeID = '';
    this.receiveDate = '';
    this.completedStages++;
    this.showMsg('✅ Volume received!');
  }

  private showMsg(text: string) {
    this.msg = text;
    setTimeout(() => this.msg = '', 2000);
  }
}
