import { Component } from '@angular/core';
interface SerialIssue {
  number: string;
  date: string;
}
@Component({
  selector: 'app-registerissue',
  templateUrl: './registerissue.component.html',
  styleUrls: ['./registerissue.component.css']
})
export class RegisterissueComponent {

  issueNumber: string = '';
  dateReceived: string = '';
  issues: SerialIssue[] = [];
  msg: string = '';

  submitIssue() {
    if (!this.issueNumber || !this.dateReceived) {
      this.msg = '⚠️ Please fill all required fields.';
      return;
    }

    this.issues.push({
      number: this.issueNumber,
      date: this.dateReceived
    });

    this.msg = '✅ Issue registered successfully!';
    this.issueNumber = '';
    this.dateReceived = '';

    setTimeout(() => this.msg = '', 2000);
  }
}

