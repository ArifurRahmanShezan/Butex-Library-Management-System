import { Component } from '@angular/core';

@Component({
  selector: 'app-authority-files',
  templateUrl: './authority-files-management.component.html',
  styleUrls: ['./authority-files-management.component.css']
})
export class AuthorityFilesManagementComponent {
  authorityType: string = '';
  authorityName: string = '';

  authorityRecords: Record<string, string[]> = {
    Personal: [],
    Corporate: []
  };

  get authorityTypes(): string[] {
    return Object.keys(this.authorityRecords);
  }

  addAuthority() {
    const type = this.authorityType;
    const name = this.authorityName.trim();

    if (!type || !name) return;

    this.authorityRecords[type].push(name);

    alert(`${type} authority "${name}" added successfully.`);

    // Reset form fields
    this.authorityType = '';
    this.authorityName = '';
  }
}

