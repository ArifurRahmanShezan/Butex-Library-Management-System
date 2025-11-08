import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trail-4',
  templateUrl: './trail-4.component.html',
  styleUrls: ['./trail-4.component.css']
})
export class Trail4Component implements OnInit {
  catalogItems: any[] = [];
  records: any[] = [];
  showModal = false;
  isEditing = false;

  statuses = ['IN_PROCESS', 'AVAILABLE', 'LOST', 'CHECKED_OUT'];

  item = {
    id: 0,
    accessionNumber: '',
    barcode: '',
    bibliographicRecord: { id: 0 },
    location: '',
    status: 'IN_PROCESS',
    acquisitionDate: '',
    price: 0,
    acquisitionSource: '',
    digitalContentUrls: []
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCatalogItems();
    this.loadRecords();
  }

  loadCatalogItems() {
    this.apiService.getCatalogItem().subscribe({
      next: (res) => (this.catalogItems = res || []),
      error: (err) => console.error('Error loading catalog items', err)
    });
  }

  loadRecords() {
    this.apiService.getRecords().subscribe({
      next: (res) => (this.records = res || []),
      error: (err) => console.error('Error loading records', err)
    });
  }

  openModal() {
    this.isEditing = false;
    this.showModal = true;
    this.resetForm();
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  editItem(item: any) {
    this.isEditing = true;
    this.item = { ...item, bibliographicRecord: item.bibliographicRecord || { id: 0 } };
    this.showModal = true;
  }

  deleteItem(item: any) {
    if (confirm(`Delete item "${item.accessionNumber}"?`)) {
      // Optional: integrate DELETE API if available
      this.catalogItems = this.catalogItems.filter(x => x.id !== item.id);
    }
  }

  saveItem() {
    if (!this.item.accessionNumber || !this.item.barcode || !this.item.location) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditing) {
      const index = this.catalogItems.findIndex(x => x.id === this.item.id);
      if (index > -1) this.catalogItems[index] = { ...this.item };
    } else {
      this.item.id = this.catalogItems.length + 1;
      this.catalogItems.push({ ...this.item });
    }

    this.closeModal();
  }

  private resetForm() {
    this.item = {
      id: 0,
      accessionNumber: '',
      barcode: '',
      bibliographicRecord: { id: 0 },
      location: '',
      status: 'IN_PROCESS',
      acquisitionDate: '',
      price: 0,
      acquisitionSource: '',
      digitalContentUrls: []
    };
  }
}
