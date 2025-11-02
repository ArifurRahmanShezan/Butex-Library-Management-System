import { Component } from '@angular/core';

interface TableItem {
  name: string;
  value: string;
  type: string;
}

interface Department {
  name: string;
  code: string;
}

@Component({
  selector: 'app-patron-management',
  templateUrl: './patron-management.component.html',
  styleUrls: ['./patron-management.component.css']
})
export class PatronManagementComponent {
  activeTab: string = 'patron';
  message: string = '';

  categories: string[] = ['Student', 'Faculty', 'Staff'];
  departments: Department[] = [];

  tableData: TableItem[] = [];

  patron = { name: '', id: '', category: '' };
  department = { name: '', code: '' };
  course = { name: '', department: '' };
  category = { name: '', limit: '' };

  setTab(tab: string) {
    this.activeTab = tab;
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

  addCourse() {
    if (!this.course.name || !this.course.department) return;
    this.tableData.push({
      name: this.course.name,
      value: this.course.department,
      type: 'Course'
    });
    this.showMessage('✅ Course added!');
    this.course = { name: '', department: '' };
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
    setTimeout(() => this.message = '', 2000);
  }
}
