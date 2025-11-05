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
  departments: any[] = []; // assuming you'll fetch this from another API later

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    // Load patron categories
    this.api.getPatronCategories().subscribe({
      next: (res) => {
        this.patronCategories = res.payload;
      },
      error: (err) => console.error('Error fetching patron categories:', err)
    });

    // Example static departments (you can fetch via API too)
    this.departments = [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Library Science' },
      { id: 3, name: 'Information Technology' }
    ];
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
