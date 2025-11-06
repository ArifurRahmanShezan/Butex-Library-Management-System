import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trail-4',
  templateUrl: './trail-4.component.html',
  styleUrls: ['./trail-4.component.css']
})
export class Trail4Component implements OnInit {
  message: string = '';
  records: any[] = []; // 🆕 for dropdown (bibliographicRecord)
  statuses = ['IN_PROCESS', 'AVAILABLE', 'LOST', 'CHECKED_OUT'];

  item = {
    accessionNumber: '',
    barcode: '',
    bibliographicRecord: { id: 0 },
    location: '',
    status: 'IN_PROCESS',
    price: 0,
    acquisitionSource: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  // ✅ Fetch available bibliographic records
  loadRecords() {
    this.apiService.getRecords().subscribe({
      next: (res) => {
        this.records = res || [];
        console.log('Records loaded:', this.records);
      },
      error: (err) => {
        console.error('Error loading records:', err);
        this.showMessage('❌ Failed to load bibliographic records.');
      }
    });
  }

  // ✅ Submit catalog item
  submitItem() {
    if (
      !this.item.accessionNumber ||
      !this.item.barcode ||
      !this.item.bibliographicRecord.id ||
      !this.item.location
    ) {
      this.showMessage('⚠️ Please fill in all required fields.');
      return;
    }

    this.apiService.addCatalogItem(this.item).subscribe({
      next: (res) => {
        console.log('Item added:', res);
        this.showMessage('✅ Catalog item added successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding item:', err);
        this.showMessage('❌ Failed to add catalog item.');
      }
    });
  }

  private resetForm() {
    this.item = {
      accessionNumber: '',
      barcode: '',
      bibliographicRecord: { id: 0 },
      location: '',
      status: 'IN_PROCESS',
      price: 0,
      acquisitionSource: ''
    };
  }

  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }
}
