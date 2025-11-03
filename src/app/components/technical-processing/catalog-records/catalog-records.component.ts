import { Component } from '@angular/core';

interface AuditLog {
  action: 'Edit' | 'Delete';
  recordId: string;
  details: string;
  timestamp: string;
}

@Component({
  selector: 'app-catalog-modify-delete',
  templateUrl: './catalog-records.component.html',
  styleUrls: ['./catalog-records.component.css']
})
export class CatalogRecordsComponent {
  activeTab: 'edit' | 'delete' = 'edit';

  // Edit form
  editRecordId = '';
  editFields = '';

  // Delete form
  deleteRecordId = '';
  confirmDelete = false;

  // Audit Log
  auditLog: AuditLog[] = [];

  setTab(tab: 'edit' | 'delete') {
    this.activeTab = tab;
  }

  updateRecord() {
    const now = new Date().toLocaleString();
    this.auditLog.push({
      action: 'Edit',
      recordId: this.editRecordId.trim(),
      details: this.editFields.trim(),
      timestamp: now
    });
    alert(`Record ${this.editRecordId} updated successfully.`);
    this.editRecordId = '';
    this.editFields = '';
  }

  deleteRecord() {
    if (!this.confirmDelete) {
      alert('Please confirm deletion.');
      return;
    }
    const now = new Date().toLocaleString();
    this.auditLog.push({
      action: 'Delete',
      recordId: this.deleteRecordId.trim(),
      details: 'Record deleted',
      timestamp: now
    });
    alert(`Record ${this.deleteRecordId} deleted successfully.`);
    this.deleteRecordId = '';
    this.confirmDelete = false;
  }
}
