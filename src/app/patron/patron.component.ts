import { Component, OnInit } from '@angular/core';

interface Category {
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

  // Categories
  categories: Category[] = [
    { name: 'Student', description: 'For student borrowers' },
    { name: 'Teacher', description: 'For teaching staff' },
    { name: 'Researcher', description: 'External researchers' }
  ];
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

  constructor() {}

  ngOnInit(): void {}
  

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
  

  // ================= Category =================
  saveCategory() {
    if (!this.catName || !this.catDesc) return alert('Fill all fields.');
    const data: Category = { name: this.catName, description: this.catDesc };
    if (this.editingIndex !== null) this.categories[this.editingIndex] = data;
    else this.categories.push(data);
    this.closeModal();
  }

  deleteCategory(index: number) {
    if (confirm('Delete this category?')) this.categories.splice(index, 1);
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

