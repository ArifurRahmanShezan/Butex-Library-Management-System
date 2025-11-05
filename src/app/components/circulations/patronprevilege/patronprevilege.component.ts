import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface PrivilegeEntry {
  categoryId: number;
  categoryName: string;
  maxItemsOnLoan: number;
  loanPeriodDays: number;
  maxRenewals: number;
}

@Component({
  selector: 'app-patronprevilege',
  templateUrl: './patronprevilege.component.html',
  styleUrls: ['./patronprevilege.component.css']
})
export class PatronprevilegeComponent implements OnInit {

  // Categories dropdown
  categories: { id: number; name: string }[] = [];

  // Form fields
  selectedCategoryId: number | null = null;
  loanPeriodDays: number | null = null;
  maxRenewals: number | null = null;
  maxItemsOnLoan: number | null = null;

  // Table data
  matrix: PrivilegeEntry[] = [];

  // Status messages
  msg: string = '';
  msgType: 'success' | 'error' = 'success';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllPatronCategory();
    this.getAllPrivileges();
  }

  // ✅ Get all patron categories
  getAllPatronCategory(): void {
    this.api.getPatronCategories().subscribe({
      next: (res) => {
        this.categories = res.payload;
      },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  // ✅ Get all patron privileges
  getAllPrivileges(): void {
    this.api.getPatronPrivileges().subscribe({
      next: (res) => {
        const privileges = res.payload ?? res;
        this.matrix = privileges.map((p: any) => ({
          categoryId: p.patronCategory?.id,
          categoryName: p.patronCategory?.name || 'N/A',
          maxItemsOnLoan: p.maxItemsOnLoan,
          loanPeriodDays: p.loanPeriodDays,
          maxRenewals: p.maxRenewals
        }));
      },
      error: (err) => console.error('Error loading privileges:', err)
    });
  }

  // ✅ Submit form (POST to backend)
  submitForm(): void {
    if (!this.selectedCategoryId || !this.loanPeriodDays || !this.maxRenewals || !this.maxItemsOnLoan) {
      this.msg = '⚠️ Please fill all required fields!';
      this.msgType = 'error';
      return;
    }

    const payload = {
      patronCategory: { id: Number(this.selectedCategoryId) },
      loanPeriodDays: this.loanPeriodDays,
      maxRenewals: this.maxRenewals,
      maxItemsOnLoan: this.maxItemsOnLoan
    };

    this.api.setPatronPrivileges(payload).subscribe({
      next: (res) => {
        this.msg = '✅ Privilege added successfully!';
        this.msgType = 'success';

        // Refresh the list
        this.getAllPrivileges();

        // Reset form
        this.selectedCategoryId = null;
        this.loanPeriodDays = null;
        this.maxRenewals = null;
        this.maxItemsOnLoan = null;

        setTimeout(() => this.msg = '', 3000);
      },
      error: (err) => {
        console.error('Error adding privilege:', err);
        this.msg = '❌ Failed to add privilege.';
        this.msgType = 'error';
      }
    });
  }
}
