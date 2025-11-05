import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface TableItem {
  name: string;
  value: string;
  type: string;
}

interface Department {
  id?: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-patron-management',
  templateUrl: './patron-management.component.html',
  styleUrls: ['./patron-management.component.css']
})
export class PatronManagementComponent implements OnInit {
  activeTab: string = 'patron';
  message: string = '';

  categories: string[] = ['Student', 'Faculty', 'Staff'];

  departments: Department[] = [
    { id: 1, name: 'Mathematics', code: 'MATH' },
    { id: 2, name: 'Computer Science', code: 'CS' },
    { id: 3, name: 'Physics', code: 'PHY' },
    { id: 4, name: 'uju', code: 'hhh' }
  ];

  tableData: TableItem[] = [];
  courses: any[] = [];

  patron = { name: '', id: '', category: '' };
  department = { name: '', code: '' };
  course = { name: '', code: '', departmentId: 0, description: '' };
  category = { name: '', limit: '' };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (this.activeTab === 'course') {
      this.loadCourses();
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'course') {
      this.loadCourses();
    }
  }

  // ✅ Load courses (matches your plain array response)
  loadCourses() {
    this.apiService.getCourses().subscribe({
      next: (res) => {
        console.log('API Response:', res); // 🔍 for debugging

        // 🔽 Transform API response to keep only required fields
        this.courses = (res || []).map((c: any) => ({
          name: c.name || '',
          code: c.code || '',
          departmentId: c.department ? c.department.id : null,
          description: '' // you can fill this from API if available
        }));

        console.log('Filtered Courses:', this.courses);
        this.showMessage('✅ Courses loaded successfully!');
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.showMessage('❌ Failed to load courses!');
      }
    });
  }


  addPatron() {
    if (!this.patron.name || !this.patron.id || !this.patron.category) return;
    this.tableData.push({
      name: this.patron.name,
      value: this.patron.id,
      type: this.patron.category
    });
    this.showMessage('✅ Patron added!');
    this.patron = { name: '', id: '', category: '' };
  }

  addDepartment() {
    if (!this.department.name || !this.department.code) return;
    this.departments.push({ ...this.department });
    this.tableData.push({
      name: this.department.name,
      value: this.department.code,
      type: 'Department'
    });
    this.showMessage('✅ Department added!');
    this.department = { name: '', code: '' };
  }

  // ✅ Add new course
  addCourse() {
    if (!this.course.name || !this.course.code || !this.course.departmentId) {
      this.showMessage('⚠️ Please fill in all required fields.');
      return;
    }

    this.apiService.addCourse(this.course).subscribe({
      next: () => {
        this.showMessage('✅ Course added successfully!');
        this.course = { name: '', code: '', departmentId: 0, description: '' };
        this.loadCourses(); // refresh course list
      },
      error: (err) => {
        console.error('Error adding course:', err);
        this.showMessage('❌ Failed to add course!');
      }
    });
  }

  addCategory() {
    if (!this.category.name || !this.category.limit) return;
    this.tableData.push({
      name: this.category.name,
      value: this.category.limit,
      type: 'Category'
    });
    this.showMessage('✅ Category added!');
    this.category = { name: '', limit: '' };
  }

  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 2000);
  }
}
