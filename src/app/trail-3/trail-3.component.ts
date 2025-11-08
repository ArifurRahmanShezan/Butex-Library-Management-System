import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trail-3',
  templateUrl: './trail-3.component.html',
  styleUrls: ['./trail-3.component.css']
})
export class Trail3Component implements OnInit {
  message: string = '';
  templates: any[] = [];
  records: any[] = []; // 🆕 Store list of catalog records

  showModal = false;
  editingRecord: any = null;

  record = {
    format: ['MARC21', 'DUBLIN_CORE', 'SERIAL'],
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publicationYear: '',
    rawContent: '',
    catalogingTemplate: {
      id: 0
    }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadTemplates();
    this.loadRecords(); // 🆕 Load records on init
  }


  openModal() {
    this.showModal = true;
    this.editingRecord = null;
    this.record = {
      format: ['MARC21', 'DUBLIN_CORE', 'SERIAL'],
      title: '',
      author: '',
      isbn: '',
      publisher: '',
      publicationYear: '',
      rawContent: '',
      catalogingTemplate: { id: 0 }
    };
  }

  closeModal() {
    this.showModal = false;
  }

  editRecord(rec: any) {
    this.editingRecord = rec;
    this.record = { ...rec, catalogingTemplate: { id: rec.catalogingTemplateId || 0 } };
    this.showModal = true;
  }

  saveRecord() {
    if (this.editingRecord) {
      // update existing
      console.log('Updating record:', this.record);
    } else {
      // add new
      this.submitRecord();
    }
    this.closeModal();
  }

  deleteRecord(id: number) {
    if (confirm('Delete this record?')) {
      console.log('Deleting record ID:', id);
    }
  }

  // ✅ Load templates
  loadTemplates() {
    this.apiService.getTemplates().subscribe({
      next: (res) => {
        this.templates = res || [];
        console.log('Templates loaded:', this.templates);
      },
      error: (err) => {
        console.error('Error loading templates:', err);
        this.showMessage('❌ Failed to load templates.');
      }
    });
  }

  // ✅ Load records
  loadRecords() {
    this.apiService.getRecords().subscribe({
      next: (res) => {
        this.records = res || [];
        console.log('Records loaded:', this.records);
      },
      error: (err) => {
        console.error('Error loading records:', err);
        this.showMessage('❌ Failed to load records.');
      }
    });
  }

  // ✅ Submit record
  submitRecord() {
    if (
      !this.record.title ||
      !this.record.author ||
      !this.record.isbn ||
      !this.record.catalogingTemplate.id
    ) {
      this.showMessage('⚠️ Please fill in all required fields.');
      return;
    }

    this.apiService.addCatalogRecord(this.record).subscribe({
      next: (res) => {
        console.log('Record added:', res);
        this.showMessage('✅ Record added successfully!');
        this.resetForm();
        this.loadRecords(); // 🆕 Reload table after adding record
      },
      error: (err) => {
        console.error('Error adding record:', err);
        this.showMessage('❌ Failed to add record.');
      }
    });
  }

  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }

  private resetForm() {
    this.record = {
      format: ['MARC21', 'DUBLIN_CORE', 'SERIAL'],
      title: '',
      author: '',
      isbn: '',
      publisher: '',
      publicationYear: '',
      rawContent: '',
      catalogingTemplate: {
        id: 0
      }
    };
  }
}
