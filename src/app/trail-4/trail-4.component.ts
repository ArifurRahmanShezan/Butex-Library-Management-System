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
  showStatusModal = false;
  isEditing = false;

  statuses = [
    'IN_PROCESS',
    'AVAILABLE',
    'LOST',
    'ON_LOAN',
    'ON_HOLD',
    'DAMAGED',
    'IN_BINDING'
  ];

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
    digitalContentUrls: [] as string[]
  };

  statusItem: any = { id: 0, status: '' };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCatalogItems();
    this.loadRecords();
  }

  // ✅ Load catalog items
  loadCatalogItems() {
    this.apiService.getCatalogItem().subscribe({
      next: (res) => (this.catalogItems = res || []),
      error: (err) => console.error('Error loading catalog items', err)
    });
  }

  // ✅ Load bibliographic records
  loadRecords() {
    this.apiService.getRecords().subscribe({
      next: (res) => (this.records = res || []),
      error: (err) => console.error('Error loading records', err)
    });
  }

  // ✅ Modal for Add/Edit
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
    this.item = {
      ...item,
      bibliographicRecord: item.bibliographicRecord || { id: 0 }
    };
    this.showModal = true;
  }


  // ✅ Open Status Modal
  openStatusModal(item: any) {
    this.showStatusModal = true;
    this.statusItem = { id: item.id, status: item.status };
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.statusItem = { id: 0, status: '' };
  }

  // ✅ Save (Add / Edit)
  saveItem() {
    if (
      !this.item.accessionNumber ||
      !this.item.barcode ||
      !this.item.location ||
      !this.item.bibliographicRecord.id
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      recordId: this.item.bibliographicRecord.id,
      accessionNumber: this.item.accessionNumber,
      barcode: this.item.barcode,
      location: this.item.location,
      status: this.item.status,
      type: 'Physical',
      price: this.item.price,
      acquisitionSource: this.item.acquisitionSource
    };

    if (this.isEditing) {
      this.apiService.editCatalogItem(this.item.id, payload).subscribe({
        next: (res) => {
          console.log('Item updated successfully:', res);
          this.loadCatalogItems();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating catalog item:', err);
          alert('Failed to update item.');
        }
      });
    } else {
      this.apiService.addCatalogItem(payload).subscribe({
        next: (res) => {
          console.log('Item added successfully:', res);
          this.loadCatalogItems();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error adding catalog item:', err);
          alert('Failed to add item.');
        }
      });
    }
  }

  // ✅ Delete
  deleteItem(item: any) {
    if (confirm(`Are you sure you want to delete "${item.accessionNumber}"?`)) {
      this.apiService.deleteCatalogItem(item.id).subscribe({
        next: () => {
          console.log('Item deleted successfully');
          this.loadCatalogItems();
        },
        error: (err) => {
          console.error('Error deleting catalog item:', err);
          alert('Failed to delete item.');
        }
      });
    }
  }

  // ✅ Update Status via Modal
  updateStatus() {
    if (!this.statusItem.id || !this.statusItem.status) {
      alert('Please select a status before updating.');
      return;
    }

    // Find the full item object
    const currentItem = this.catalogItems.find(i => i.id === this.statusItem.id);
    if (!currentItem) {
      alert('Item not found.');
      return;
    }

    // Prepare full payload (same as edit)
    const payload = {
      recordId: currentItem.bibliographicRecord?.id || 0,
      accessionNumber: currentItem.accessionNumber,
      barcode: currentItem.barcode,
      location: currentItem.location,
      status: this.statusItem.status, // ✅ updated field
      type: 'Physical',
      price: currentItem.price,
      acquisitionSource: currentItem.acquisitionSource
    };

    this.apiService.editCatalogItem(this.statusItem.id, payload).subscribe({
      next: (res) => {
        console.log('Status updated successfully:', res);
        this.loadCatalogItems();
        this.closeStatusModal();
        alert(`Status updated successfully.`);
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status. Please check console for details.');
      }
    });
  }


  private resetForm() {
    this.item = {
      id: 0,
      accessionNumber: '',
      barcode: '',
      bibliographicRecord: { id: 0 },
      location: '',
      status: '',
      acquisitionDate: '',
      price: 0,
      acquisitionSource: '',
      digitalContentUrls: []
    };
  }
}
