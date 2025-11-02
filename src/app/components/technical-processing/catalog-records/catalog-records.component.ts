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
  // Edit form fields
  editRecordId: string = '';
  editFields: string = '';

  // Delete form fields
  deleteRecordId: string = '';
  confirmDelete: boolean = false;

  // Audit log list
  auditLog: AuditLog[] = [];

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

