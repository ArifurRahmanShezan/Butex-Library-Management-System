import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface PrivilegeEntry {
  id: number;
  categoryId: number;
  categoryName: string;
  maxItemsOnLoan: number;
  loanPeriodDays: number;
  maxRenewals: number;
}

@Component({
  selector: 'app-patron',
  templateUrl: './patron.component.html',
  styleUrls: ['./patron.component.css']
})
export class PatronComponent implements OnInit {
  // Tabs
  currentTab: 'category' | 'privilege' | 'patron' = 'category';

  // Modal
  modalOpen = false;
  modalType: 'category' | 'privilege' | 'patron' = 'category';
  editingIndex: number | null = null;

  // Categories
  categories: Category[] = [];
  catName = '';
  catDesc = '';

  // Privileges
  matrix: PrivilegeEntry[] = [];
  selectedCategoryId: number | null = null;
  loanPeriodDays: number | null = null;
  maxRenewals: number | null = null;
  maxItemsOnLoan: number | null = null;

  // Patrons
  patrons: any[] = [];
  libraryId = '';
  name = '';
  email = '';
  selectedCategory: number | null = null;
  selectedDepartment: number | null = null;
  active = true;
  patronCategories: any[] = [];
  departments: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.getAllPrivileges();
    this.loadPatronCategories();
    this.loadDepartments();
    this.loadPatrons();
  }

  // ================= CATEGORY =================
  loadCategories() {
    this.api.getPatronCategories().subscribe({
      next: (res) => (this.categories = res.payload),
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  addCategory() {
    if (!this.catName.trim() || !this.catDesc.trim()) {
      alert('Fill all fields.');
      return;
    }
    const newCategory = { name: this.catName, description: this.catDesc };
    this.api.addPatronCategory(newCategory).subscribe({
      next: () => {
        this.catName = '';
        this.catDesc = '';
        this.loadCategories();
        this.closeModal();
      },
      error: (err) => console.error('Error adding category:', err)
    });
  }

  updateCategory(index: number) {
    const cat = this.categories[index];
    const updated = { name: this.catName, description: this.catDesc };
    this.api.updatePatronCategory(cat.id, updated).subscribe({
      next: () => {
        this.loadCategories();
        this.closeModal();
      },
      error: (err) => console.error('Error updating category:', err)
    });
  }

  deleteCategory(index: number) {
    const cat = this.categories[index];
    if (!cat) return;
    if (confirm(`Delete category "${cat.name}"?`)) {
      this.api.deletePatronCategory(cat.id).subscribe({
        next: () => {
          alert(`Category "${cat.name}" deleted.`);
          this.loadCategories();
        },
        error: (err) => console.error('Error deleting category:', err)
      });
    }
  }

  // ================= PRIVILEGES =================
  getAllPrivileges() {
    this.api.getPatronPrivileges().subscribe({
      next: (res) => {
        const privileges = res.payload ?? res;
        this.matrix = privileges.map((p: any) => ({
          id: p.id,
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

  submitPrivilege() {
    if (!this.selectedCategoryId || !this.loanPeriodDays || !this.maxRenewals || !this.maxItemsOnLoan) {
      alert('Please fill all required fields!');
      return;
    }

    const payload = {
      patronCategory: { id: Number(this.selectedCategoryId) },
      loanPeriodDays: this.loanPeriodDays,
      maxRenewals: this.maxRenewals,
      maxItemsOnLoan: this.maxItemsOnLoan
    };

    this.api.setPatronPrivileges(payload).subscribe({
      next: () => {
        alert('Privilege added successfully!');
        this.getAllPrivileges();
        this.closeModal();
      },
      error: (err) => console.error('Error adding privilege:', err)
    });
  }

  deletePrivilege(index: number) {
    const priv = this.matrix[index];
    if (confirm(`Delete privilege for "${priv.categoryName}"?`)) {
      this.api.deletePatronPrivileges(priv.id).subscribe({
        next: () => {
          alert('Privilege deleted.');
          this.getAllPrivileges();
        },
        error: (err) => console.error('Error deleting privilege:', err)
      });
    }
  }

  // ================= PATRON =================
  loadPatronCategories() {
    this.api.getPatronCategories().subscribe({
      next: (res) => (this.patronCategories = res.payload),
      error: (err) => console.error('Error fetching patron categories:', err)
    });
  }

  loadDepartments() {
    this.departments = [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Library Science' },
      { id: 3, name: 'Information Technology' },
      { id: 4, name: 'Engineering' },
      { id: 5, name: 'Arts' }
    ];
  }

  loadPatrons() {
    this.api.getPatrons().subscribe({
      next: (res) => {
        this.patrons = Array.isArray(res) ? res : [res]; // handles array or object response
      },
      error: (err) => console.error('Error fetching patrons:', err)
    });
  }

  onSubmit() {
    if (!this.libraryId || !this.name || !this.email || !this.selectedCategory || !this.selectedDepartment) {
      alert('Please fill all required fields!');
      return;
    }

    const payload = {
      libraryId: this.libraryId,
      name: this.name,
      email: this.email,
      patronCategory: { id: this.selectedCategory },
      department: { id: this.selectedDepartment },
      active: this.active
    };

    this.api.addPatron(payload).subscribe({
      next: () => {
        alert('✅ Patron added successfully!');
        this.resetForm();
        this.loadPatrons();
      },
      error: (err) => console.error('Error adding patron:', err)
    });
  }

  editPatron(index: number) {
    const p = this.patrons[index];
    this.libraryId = p.libraryId;
    this.name = p.name;
    this.email = p.email;
    this.selectedCategory = p.patronCategory?.id || null;
    this.selectedDepartment = p.department?.id || null;
    this.active = p.active;
  }

  deletePatron(index: number) {
    const patron = this.patrons[index];
    if (confirm(`Remove patron "${patron.name}" from the list?`)) {
      this.patrons.splice(index, 1); // Remove locally
      alert('Patron removed from view.');
    }
  }

  resetForm() {
    this.libraryId = '';
    this.name = '';
    this.email = '';
    this.selectedCategory = null;
    this.selectedDepartment = null;
    this.active = true;
  }

  // ================= UI =================
  switchTab(tab: 'category' | 'privilege' | 'patron') {
    this.currentTab = tab;
  }

  openModal(type: 'category' | 'privilege' | 'patron', index: number | null = null) {
    this.modalOpen = true;
    this.modalType = type;
    this.editingIndex = index;

    if (type === 'category' && index !== null) {
      const c = this.categories[index];
      this.catName = c.name;
      this.catDesc = c.description;
    }
  }

  closeModal() {
  this.modalOpen = false;
  this.editingIndex = null;
  this.catName = '';
  this.catDesc = '';
  this.libraryId = '';
  this.name = '';
  this.email = '';
  this.selectedCategoryId = null;
  this.maxItemsOnLoan = null;
  this.loanPeriodDays = null;
  this.maxRenewals = null;
}

}
