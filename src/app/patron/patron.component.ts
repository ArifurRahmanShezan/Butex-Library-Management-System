import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // import your API service

interface Category {
  id:number;
  name: string;
  description: string;
}

interface Privilege {
  category: string;
  maxBorrow: number;
  duration: number;
  fine: number;
  renewal: number;
  active: boolean;
}

interface Patron {
  libraryId: string;
  name: string;
  email: string;
  category: string;
  department: string;
  active: boolean;
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

  // ================= Category =================
  categories: Category[] = [];
  catName = '';
  catDesc = '';

  // Privileges
  privileges: Privilege[] = [
    { category: 'Student', maxBorrow: 3, duration: 14, fine: 0.5, renewal: 2, active: true },
    { category: 'Teacher', maxBorrow: 5, duration: 30, fine: 0.2, renewal: 3, active: true },
    { category: 'Researcher', maxBorrow: 6, duration: 45, fine: 0.1, renewal: 4, active: true },
  ];
  privCategory = '';
  maxBorrow!: number;
  duration!: number;
  fine!: number;
  renewal!: number;
  privActive = false;

  // Patrons
  patrons: Patron[] = [
    { libraryId: 'LIB001', name: 'John Doe', email: 'johndoe@example.com', category: 'Student', department: 'Science', active: true },
    { libraryId: 'LIB002', name: 'Mary Smith', email: 'marysmith@example.com', category: 'Teacher', department: 'Arts', active: true },
    { libraryId: 'LIB003', name: 'David Lee', email: 'davidlee@example.com', category: 'Researcher', department: 'Engineering', active: true },
  ];
  libraryId = '';
  patronName = '';
  patronEmail = '';
  patronCategory = '';
  patronDept = 'Science';
  patronActive = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // ================= Load Categories =================
  loadCategories() {
    this.api.getPatronCategories().subscribe({
      next: (res) => {
        this.categories = res.payload;
        console.log('Loaded categories:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  addCategory() {
    if (this.catName.trim() && this.catDesc.trim()) {
      const newCategory = { name: this.catName, description: this.catDesc };
      this.api.addPatronCategory(newCategory).subscribe({
        next: () => {
          this.catName = '';
          this.catDesc = '';
          this.loadCategories(); // refresh list
          this.closeModal();
        },
        error: (err) => {
          console.error('Error adding category:', err);
        }
      });
    } else {
      alert('Fill all fields.');
    }
  }
deleteCategory(index: number) {
  const categoryToDelete: Category | undefined = this.categories[index];
  if (!categoryToDelete) return; // safety check

  if (confirm(`Delete category "${categoryToDelete.name}"?`)) {
    // Use the ID, not name
    this.api.deletePatronCategory(categoryToDelete.id).subscribe({
      next: () => {
        alert(`Category "${categoryToDelete.name}" deleted successfully.`);
        this.loadCategories(); // reload categories
      },
      error: (err) => {
        console.error('Error deleting category:', err);
        alert('Failed to delete category. Check console.');
      }
    });
  }
}

updateCategory(index: number) {
  const categoryToUpdate = this.categories[index];
  const updatedCategory = { name: this.catName, description: this.catDesc };

  this.api.updatePatronCategory(categoryToUpdate.id, updatedCategory).subscribe({
    next: () => {
      this.loadCategories(); // refresh the list
      this.closeModal();     // close the modal
    },
    error: (err) => {
      console.error('Error updating category:', err);
      alert('Failed to update category. Check console.');
    }
  });
}

  // ================= Tabs =================
  switchTab(tab: 'category' | 'privilege' | 'patron') {
    this.currentTab = tab;
  }

  // ================= Modal =================
  openModal(type: 'category' | 'privilege' | 'patron', index: number | null = null) {
    this.modalOpen = true;
    this.modalType = type;
    this.editingIndex = index;

    // Reset fields
    this.catName = '';
    this.catDesc = '';
    this.privCategory = '';
    this.maxBorrow = 0;
    this.duration = 0;
    this.fine = 0;
    this.renewal = 0;
    this.privActive = false;
    this.libraryId = '';
    this.patronName = '';
    this.patronEmail = '';
    this.patronCategory = '';
    this.patronDept = 'Science';
    this.patronActive = false;

    // Populate fields if editing
    if (index !== null) {
      if (type === 'category') {
        const cat = this.categories[index];
        this.catName = cat.name;
        this.catDesc = cat.description;
      } else if (type === 'privilege') {
        const priv = this.privileges[index];
        this.privCategory = priv.category;
        this.maxBorrow = priv.maxBorrow;
        this.duration = priv.duration;
        this.fine = priv.fine;
        this.renewal = priv.renewal;
        this.privActive = priv.active;
      } else if (type === 'patron') {
        const patron = this.patrons[index];
        this.libraryId = patron.libraryId;
        this.patronName = patron.name;
        this.patronEmail = patron.email;
        this.patronCategory = patron.category;
        this.patronDept = patron.department;
        this.patronActive = patron.active;
      }
    } else if (type === 'patron') {
      this.generateLibraryId();
    }
  }

  closeModal() {
    this.modalOpen = false;
  }

  // ================= Privilege =================
  savePrivilege() {
    if (!this.privCategory || !this.maxBorrow || !this.duration || !this.fine || !this.renewal) return alert('Fill all fields.');
    const data: Privilege = { category: this.privCategory, maxBorrow: this.maxBorrow, duration: this.duration, fine: this.fine, renewal: this.renewal, active: this.privActive };
    if (this.editingIndex !== null) this.privileges[this.editingIndex] = data;
    else this.privileges.push(data);
    this.closeModal();
  }

  deletePrivilege(index: number) {
    if (confirm('Delete this privilege?')) this.privileges.splice(index, 1);
  }

  // ================= Patron =================
  savePatron() {
    if (!this.patronName || !this.patronEmail || !this.patronCategory) return alert('Fill all fields.');
    const data: Patron = { libraryId: this.libraryId, name: this.patronName, email: this.patronEmail, category: this.patronCategory, department: this.patronDept, active: this.patronActive };
    if (this.editingIndex !== null) this.patrons[this.editingIndex] = data;
    else this.patrons.push(data);
    this.closeModal();
  }

  deletePatron(index: number) {
    if (confirm('Delete this patron?')) this.patrons.splice(index, 1);
  }

  generateLibraryId() {
    const id = 'LIB' + String(this.patrons.length + 1).padStart(3, '0');
    this.libraryId = id;
  }
}
