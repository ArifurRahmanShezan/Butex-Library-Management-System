import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface PrivilegeEntry {
  categoryId: number;
  categoryName: string;
  maxBooksAllowed: number;
  borrowDurationDays: number;
  finePerDay?: number;
}

@Component({
  selector: 'app-patronprevilege',
  templateUrl: './patronprevilege.component.html',
  styleUrls: ['./patronprevilege.component.css']
})
export class PatronprevilegeComponent implements OnInit {

  categories: { id: number; name: string }[] = [];
  selectedCategoryId: number | null = null;
  maxBooksAllowed: number | null = null;
  borrowDurationDays: number | null = null;
  finePerDay: number | null = null;

  matrix: PrivilegeEntry[] = [];

  msg: string = '';
  msgType: 'success' | 'error' = 'success';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllPatronCategory();
    this.getAllPrivileges(); // ✅ load privileges list
  }

  // ✅ Fetch patron categories
  getAllPatronCategory(): void {
    this.api.getPatronCategories().subscribe({
      next: (res) => {
        this.categories = res.payload;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  // ✅ Fetch existing privileges list
  getAllPrivileges(): void {
    this.api.getPatronPrivileges().subscribe({
      next: (res) => {
        console.log('Privileges response:', res);
        const privileges = res.payload ?? res;
        this.matrix = privileges.map((p: any) => ({
          categoryId: p.patronCategory?.id,
          categoryName: p.patronCategory?.name || 'N/A',
          maxBooksAllowed: p.maxItemsOnLoan,
          borrowDurationDays: p.loanPeriodDays,
          finePerDay: p.finePerDay ?? 0
        }));
      },
      error: (err) => {
        console.error('Error loading privileges:', err);
      }
    });
  }

  // ✅ Submit form & call backend
  submitForm() {
    if (!this.selectedCategoryId || !this.maxBooksAllowed || !this.borrowDurationDays || !this.finePerDay) {
      this.msg = "Please fill all required fields!";
      this.msgType = 'error';
      return;
    }

    const categoryIdNum = Number(this.selectedCategoryId);
    const selectedCategory = this.categories.find(cat => cat.id === categoryIdNum);

    if (!selectedCategory) {
      this.msg = "Selected category not found!";
      this.msgType = 'error';
      return;
    }

    // ✅ Prepare data for API
    const payload = {
      patronCategory: { id: selectedCategory.id },
      maxBooksAllowed: this.maxBooksAllowed,
      borrowDurationDays: this.borrowDurationDays,
      finePerDay: this.finePerDay
    };

    // ✅ Save via API
    this.api.setPatronPrivileges(payload).subscribe({
      next: (res) => {
        console.log('Privilege saved:', res);
        this.msg = "Privilege saved successfully!";
        this.msgType = 'success';
        this.getAllPrivileges(); // refresh table
        this.resetForm();
      },
      error: (err) => {
        console.error('Error saving privilege:', err);
        this.msg = "Failed to save privilege!";
        this.msgType = 'error';
      }
    });
  }

  // ✅ Reset form
  private resetForm(): void {
    this.selectedCategoryId = null;
    this.maxBooksAllowed = null;
    this.borrowDurationDays = null;
    this.finePerDay = null;
    setTimeout(() => this.msg = '', 2500);
  }
}
