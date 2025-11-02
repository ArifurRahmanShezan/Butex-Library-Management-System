import { Component } from '@angular/core';

@Component({
  selector: 'app-eod-processes',
  templateUrl: './eod-process.component.html',
  styleUrls: ['./eod-process.component.css']
})
export class EodProcessComponent {
  // form inputs
  mailServer: string = '';
  mailPort: string = '';
  mailUser: string = '';
  mailPass: string = '';

  // message + logs
  message: string = '';
  eodLogs: { date: string; server: string; port: string; user: string }[] = [];

  addEodProcess() {
    if (!this.mailServer || !this.mailPort || !this.mailUser || !this.mailPass) return;

    const now = new Date().toLocaleString();
    this.eodLogs.push({
      date: now,
      server: this.mailServer,
      port: this.mailPort,
      user: this.mailUser
    });

    this.message = '✅ EOD process configured!';
    this.resetForm();

    setTimeout(() => (this.message = ''), 2000);
  }

  resetForm() {
    this.mailServer = '';
    this.mailPort = '';
    this.mailUser = '';
    this.mailPass = '';
  }
}
