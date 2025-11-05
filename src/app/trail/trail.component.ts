import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.css']
})
export class TrailComponent implements OnInit {
  libraryId = '';
  name = '';
  email = '';
  selectedCategory: number | null = null;
  selectedDepartment: number | null = null;
  active = true;

  patronCategories: any[] = [];
  departments: any[] = [];
  patrons: any[] = []; // ✅ for displaying patrons in table

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPatronCategories();
    this.loadDepartments();
    this.loadPatrons(); // ✅ fetch patrons on init
  }

  loadPatronCategories(): void {
    this.api.getPatronCategories().subscribe({
      next: (res) => (this.patronCategories = res.payload),
      error: (err) => console.error('Error fetching patron categories:', err)
    });
  }

  loadDepartments(): void {
    this.departments = [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Library Science' },
      { id: 3, name: 'Information Technology' },
      { id: 8, name: 'Iogy' },
    ];
  }

  loadPatrons(): void {
    this.api.getPatrons().subscribe({
      next: (res) => {
        this.patrons = Array.isArray(res) ? res : [res]; // handles array or object response
      },
      error: (err) => console.error('Error fetching patrons:', err)
    });
  }

  onSubmit(): void {
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
      next: (res) => {
        console.log('Patron added successfully:', res);
        alert('✅ Patron added successfully!');
        this.resetForm();
        this.loadPatrons(); // ✅ refresh patron list
      },
      error: (err) => {
        console.error('Error adding patron:', err);
        alert('❌ Failed to add patron.');
      }
    });
  }

  resetForm(): void {
    this.libraryId = '';
    this.name = '';
    this.email = '';
    this.selectedCategory = null;
    this.selectedDepartment = null;
    this.active = true;
  }
}
