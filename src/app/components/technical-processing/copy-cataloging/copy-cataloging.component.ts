import { Component } from '@angular/core';

interface ImportedRecord {
  fileName: string;
  source: string;
  date: string;
}

@Component({
  selector: 'app-copy-imports',
  templateUrl: './copy-cataloging.component.html',
  styleUrls: ['./copy-cataloging.component.css']
})
export class CopyCatalogingComponent {
  fileName: string = '';
  selectedFile: File | null = null;
  source: string = '';
  progress: number = 0;
  records: ImportedRecord[] = [];

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

  onImport(): void {
    if (!this.selectedFile || !this.source) return;

    this.progress = 0;
    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
        const newRecord: ImportedRecord = {
          fileName: this.selectedFile!.name,
          source: this.source,
          date: new Date().toLocaleString()
        };
        this.records.push(newRecord);

        // Reset form
        this.selectedFile = null;
        this.fileName = '';
        this.source = '';
        this.progress = 0;
      } else {
        this.progress += 10;
      }
    }, 200);
  }
}

