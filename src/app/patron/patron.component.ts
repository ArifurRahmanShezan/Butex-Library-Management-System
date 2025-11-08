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

  // ------------------ TABS ------------------
  currentTab: 'category' | 'privilege' | 'patron' = 'category';

  // ------------------ MODAL ------------------
  modalOpen = false;
  modalType: 'category' | 'privilege' | 'patron' = 'category';
  editingIndex: number | null = null;

  // ------------------ CATEGORY ------------------
  categories: Category[] = [];
  catName = '';
  catDesc = '';

  // ------------------ PRIVILEGES ------------------
  matrix: PrivilegeEntry[] = [];
  selectedCategoryId: number | null = null;
  loanPeriodDays: number | null = null;
  maxRenewals: number | null = null;
  maxItemsOnLoan: number | null = null;

  // ------------------ PATRONS ------------------
  patrons: any[] = [];
  libraryId = '';
  name = '';
  email = '';
  selectedCategory: number | null = null;
  selectedDepartment: number | null = null;
  active = true;
  patronCategories: any[] = [];
  departments: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.getAllPrivileges();
    this.loadPatronCategories();
    this.loadDepartments();
    this.loadPatrons();
  }

  // ------------------ CATEGORY METHODS ------------------
  loadCategories() {
    this.api.getPatronCategories().subscribe({
      next: (res) => (this.categories = res.payload),
      error: (err) => console.error(err)
    });
  }

  addCategory() {
    if (!this.catName || !this.catDesc) {
      alert('Fill all fields');
      return;
    }
    this.api.addPatronCategory({ name: this.catName, description: this.catDesc }).subscribe({
      next: () => {
        this.catName = '';
        this.catDesc = '';
        this.loadCategories();
        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }

  updateCategory(index: number) {
    const c = this.categories[index];
    this.api.updatePatronCategory(c.id, { name: this.catName, description: this.catDesc }).subscribe({
      next: () => {
        this.loadCategories();
        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }

  deleteCategory(index: number) {
    const c = this.categories[index];
    if (!c) return;
    if (confirm(`Delete category "${c.name}"?`)) {
      this.api.deletePatronCategory(c.id).subscribe({
        next: () => {
          alert('Deleted');
          this.loadCategories();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // ------------------ PRIVILEGE METHODS ------------------
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
      error: (err) => console.error(err)
    });
  }

  submitPrivilege() {
    if (!this.selectedCategoryId || !this.loanPeriodDays || !this.maxRenewals || !this.maxItemsOnLoan) {
      alert('Fill all fields');
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
        alert('Added');
        this.getAllPrivileges();
        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }

  deletePrivilege(index: number) {
    const p = this.matrix[index];
    if (confirm(`Delete privilege for "${p.categoryName}"?`)) {
      this.api.deletePatronPrivileges(p.id).subscribe({
        next: () => {
          alert('Deleted');
          this.getAllPrivileges();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // ------------------ PATRON METHODS ------------------
  loadPatronCategories() {
    this.api.getPatronCategories().subscribe({
      next: (res) => (this.patronCategories = res.payload),
      error: (err) => console.error(err)
    });
  }

  loadDepartments() {
    this.departments = [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Library Science' },
      { id: 3, name: 'Information Technology' },
      { id: 4, name: 'Engineering' },
      { id: 5, name: 'Arts' },
      { id: 6, name: 'Business' },
      { id: 7, name: 'Medicine' },
      { id: 8, name: 'Iogy' }
    ];
  }

  loadPatrons() {
    this.api.getPatrons().subscribe({
      next: (res) => {
        this.patrons = Array.isArray(res) ? res : [res];
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (!this.libraryId || !this.name || !this.email || !this.selectedCategory || !this.selectedDepartment) {
      alert('Fill all fields');
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
        alert('Added');
        this.resetForm();
        this.loadPatrons();
      },
      error: (err) => console.error(err)
    });
  }

  updatePatron() {
    if (this.editingIndex === null) return;
    const p = this.patrons[this.editingIndex];
    const updated = {
      libraryId: p.libraryId,
      name: this.name,
      email: this.email,
      patronCategory: { id: this.selectedCategory },
      department: { id: this.selectedDepartment },
      active: this.active
    };
    this.api.updatePatron(p.id, updated).subscribe({
      next: () => {
        this.loadPatrons();
        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }

  deletePatron(id: number) {
    if (confirm('Remove patron?')) {
      this.api.deletePatron(id).subscribe({
        next: () => {
          alert('Removed');
          this.loadPatrons();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // ------------------ MODAL METHODS ------------------
  openModal(type: 'category' | 'privilege' | 'patron', index: number | null = null) {
    this.modalOpen = true;
    this.modalType = type;
    this.editingIndex = index;

    if (type === 'category' && index !== null) {
      const c = this.categories[index];
      this.catName = c.name;
      this.catDesc = c.description;
    } else if (type === 'patron') {
      if (index !== null) {
        const p = this.patrons[index];
        this.libraryId = p.libraryId ?? '';
        this.name = p.name ?? '';
        this.email = p.email ?? '';
        this.selectedCategory = p.patronCategory?.id ?? null;
        this.selectedDepartment = p.department?.id ?? null;
        this.active = p.active ?? true;
      } else {
        this.resetForm();
      }
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
    this.selectedCategory = null;
    this.selectedDepartment = null;
    this.selectedCategoryId = null;
    this.maxItemsOnLoan = null;
    this.loanPeriodDays = null;
    this.maxRenewals = null;
  }

  resetForm() {
    this.libraryId = '';
    this.name = '';
    this.email = '';
    this.selectedCategory = null;
    this.selectedDepartment = null;
    this.active = true;
  }

  switchTab(tab: 'category' | 'privilege' | 'patron') {
    this.currentTab = tab;
  }
}
