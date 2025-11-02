import { Component } from '@angular/core';

interface ItemRecord {
  itemId: string;
  fileName: string;
  date: string;
}

@Component({
  selector: 'app-items-processing',
  templateUrl: './items-for-processing.component.html',
  styleUrls: ['./items-for-processing.component.css']
})
export class ItemsForProcessingComponent {
  itemId: string = '';
  selectedFile: File | null = null;
  fileName: string = '';
  items: ItemRecord[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    } else {
      this.selectedFile = null;
      this.fileName = '';
    }
  }

  onSubmit(): void {
    if (!this.itemId || !this.selectedFile) return;

    const newItem: ItemRecord = {
      itemId: this.itemId,
      fileName: this.selectedFile.name,
      date: new Date().toLocaleString()
    };

    this.items.push(newItem);

    // Reset form
    this.itemId = '';
    this.selectedFile = null;
    this.fileName = '';
  }
}
