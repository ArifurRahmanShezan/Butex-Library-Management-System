import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trail-3',
  templateUrl: './trail-3.component.html',
  styleUrls: ['./trail-3.component.css']
})
export class Trail3Component implements OnInit {
  message: string = '';
  templates: any[] = []; // 🆕 Store available cataloging templates

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  // ✅ Load templates from API
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
