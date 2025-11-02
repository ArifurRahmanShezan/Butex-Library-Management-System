import { Component } from '@angular/core';
interface PrivilegeEntry {
  category: string;
  loanLimit: string;
  privileges: string;
}

@Component({
  selector: 'app-patronprevilege',
  templateUrl: './patronprevilege.component.html',
  styleUrls: ['./patronprevilege.component.css']
})
export class PatronprevilegeComponent {

  categories: string[] = ['Student', 'Faculty', 'Staff', 'Guest'];
  privilegesList: string[] = [
    'Renew Books',
    'Reserve Books',
    'Access E-Resources',
    'Late Fee Waiver',
    'Interlibrary Loan',
    'Priority Borrowing'
  ];

  // Form model
  selectedCategory: string = '';
  loanLimit: number | null = null;
  selectedPrivileges: string[] = [];

  // Table data
  matrix: PrivilegeEntry[] = [];

  // Success/Error message
  msg: string = '';
  msgType: 'success' | 'error' = 'success';

  submitForm() {
    if (!this.selectedCategory) {
      this.msg = "Please select a category!";
      this.msgType = 'error';
      return;
    }

    const privileges = this.selectedPrivileges.length ? this.selectedPrivileges.join(', ') : 'None';
    const loanLimitText = this.loanLimit !== null ? this.loanLimit.toString() : 'N/A';

    this.matrix.push({
      category: this.selectedCategory,
      loanLimit: loanLimitText,
      privileges: privileges
    });

    this.msg = "Privilege matrix updated successfully!";
    this.msgType = 'success';

    // Reset form
    this.selectedCategory = '';
    this.loanLimit = null;
    this.selectedPrivileges = [];

    // Clear message after 2.5 seconds
    setTimeout(() => this.msg = '', 2500);
  }

  togglePrivilege(priv: string, event: any) {
    if (event.target.checked) {
      this.selectedPrivileges.push(priv);
    } else {
      this.selectedPrivileges = this.selectedPrivileges.filter(p => p !== priv);
    }
  }
}


