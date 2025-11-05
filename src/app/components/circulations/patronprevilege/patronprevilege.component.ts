import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface PrivilegeEntry {
  categoryId: number;
  categoryName: string;
  maxBooksAllowed: number;
  borrowDurationDays: number;
  finePerDay: number;
}

@Component({
  selector: 'app-patronprevilege',
  templateUrl: './patronprevilege.component.html',
  styleUrls: ['./patronprevilege.component.css']
})
export class PatronprevilegeComponent implements OnInit {

  // Categories
  categories: { id: number; name: string }[] = [
    { id: 1, name: 'Student' },
    { id: 2, name: 'Faculty' },
    { id: 3, name: 'Staff' },
    { id: 4, name: 'Guest' }
  ];

  // Form fields
  selectedCategoryId: number | null = null;
  maxBooksAllowed: number | null = null;
  borrowDurationDays: number | null = null;
  finePerDay: number | null = null;

  // Table data
  matrix: PrivilegeEntry[] = [];

  // Success/Error message
  msg: string = '';
  msgType: 'success' | 'error' = 'success';

  constructor(private api: ApiService) {}

  ngOnInit(): void {}


  



  
  // Toggle form submission
  submitForm() {
    // Validation
    if (
      this.selectedCategoryId === null ||
      this.maxBooksAllowed === null ||
      this.borrowDurationDays === null ||
      this.finePerDay === null
    ) {
      this.msg = 'Please fill in all required fields!';
      this.msgType = 'error';
      return;
    }

    // Prepare payload for API
    const payload = {
      patronCategory: { id: this.selectedCategoryId },
      maxBooksAllowed: this.maxBooksAllowed,
      borrowDurationDays: this.borrowDurationDays,
      finePerDay: this.finePerDay
    };

    this.api.setPatronPrivileges(payload).subscribe({
      next: () => {
        const categoryName =
          this.categories.find(c => c.id === this.selectedCategoryId)?.name || '';

        // Add to local table
        this.matrix.push({
          categoryId: this.selectedCategoryId!,
          categoryName: categoryName,
          maxBooksAllowed: this.maxBooksAllowed!,
          borrowDurationDays: this.borrowDurationDays!,
          finePerDay: this.finePerDay!
        });

        this.msg = 'Patron privileges saved successfully!';
        this.msgType = 'success';

        // Reset form
        this.selectedCategoryId = null;
        this.maxBooksAllowed = null;
        this.borrowDurationDays = null;
        this.finePerDay = null;

        setTimeout(() => (this.msg = ''), 2500);
      },
      error: err => {
        console.error(err);
        this.msg = 'Failed to save patron privileges!';
        this.msgType = 'error';
      }
    });
  }
}
