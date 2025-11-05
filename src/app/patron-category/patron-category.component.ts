import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patron-category',
  templateUrl: './patron-category.component.html',
  styleUrls: ['./patron-category.component.css']
})
export class PatronCategoryComponent implements OnInit {
  activeTab: string = 'form';
  name: string = '';
  description: string = '';

  patronCategories: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // ✅ Get data from backend
  loadCategories() {
    this.api.getPatronCategories().subscribe({
      next: (res) => {
        this.patronCategories = res;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  // ✅ Submit form to backend
  addCategory() {
    if (this.name.trim() && this.description.trim()) {
      const newCategory = {
        name: this.name,
        description: this.description
      };

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
