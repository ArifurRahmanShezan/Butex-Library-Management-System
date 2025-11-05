import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patron-category',
  templateUrl: './patron-category.component.html',
  styleUrls: ['./patron-category.component.css']
})
export class PatronCategoryComponent implements OnInit {
  name: string = '';
  description: string = '';
  patronCategories: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getPatronCategories().subscribe({
      next: (res) => {
        this.patronCategories = res.payload; // ✅ FIX: use payload
        console.log('Loaded categories:', this.patronCategories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  addCategory() {
    if (this.name.trim() && this.description.trim()) {
      const newCategory = { name: this.name, description: this.description };
      this.api.addPatronCategory(newCategory).subscribe({
        next: () => {
          this.name = '';
          this.description = '';
          this.loadCategories(); // refresh list
        },
        error: (err) => {
          console.error('Error adding category:', err);
        }
      });
    }
  }
}
