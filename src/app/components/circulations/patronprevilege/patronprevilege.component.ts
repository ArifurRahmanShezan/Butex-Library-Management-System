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

  ngOnInit(): void {
    this.getAllPatronCategory();
  }


  



  
  // Toggle form submission
  submitForm() {
  if (!this.selectedCategoryId || !this.maxBooksAllowed || !this.borrowDurationDays || !this.finePerDay) {
    this.msg = "Please fill all required fields!";
    this.msgType = 'error';
    return;
  }

  // Convert selectedCategoryId to number (because dropdown values are strings)
  const categoryIdNum = Number(this.selectedCategoryId);

  // Find the selected category object safely
  const selectedCategory = this.categories.find(cat => cat.id === categoryIdNum);

  if (!selectedCategory) {
    this.msg = "Selected category not found!";
    this.msgType = 'error';
    return;
  }

  // Push to matrix
  this.matrix.push({
    categoryId: selectedCategory.id,
    categoryName: selectedCategory.name,
    maxBooksAllowed: this.maxBooksAllowed,
    borrowDurationDays: this.borrowDurationDays,
    finePerDay: this.finePerDay
  });

  // Reset form
  this.selectedCategoryId = null;
  this.maxBooksAllowed = null;
  this.borrowDurationDays = null;
  this.finePerDay = null;

  this.msg = "Privilege matrix updated successfully!";
  this.msgType = 'success';

  setTimeout(() => this.msg = '', 2500);
}
  getAllPatronCategory(): void {
    this.api.getPatronCategories().subscribe({
      next: (res) => {
        this.categories = res.payload; // ✅ FIX: use payload
        console.log('Loaded categories:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }
}
