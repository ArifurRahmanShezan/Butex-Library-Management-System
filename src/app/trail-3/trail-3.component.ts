import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trail-3',
  templateUrl: './trail-3.component.html',
  styleUrls: ['./trail-3.component.css']
})
export class Trail3Component {
  message: string = '';

  record = {
    format: ['MARC21', 'DUBLIN_CORE', 'SERIAL'], // default value
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publicationYear: '',
    rawContent: ''
  };

  constructor(private apiService: ApiService) {}

  // ✅ Submit catalog record
  submitRecord() {
    // Basic validation
    if (!this.record.title || !this.record.author || !this.record.isbn) {
      this.showMessage('⚠️ Please fill in required fields.');
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
      rawContent: ''
    };
  }
}
