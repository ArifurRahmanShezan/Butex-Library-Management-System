import { Component, OnInit } from '@angular/core';

interface AuditReport {
  server: string;
  date: string;
  installer: string;
  status: 'Success' | 'Failed';
  details: string;
}

@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.css']
})
export class AuditReportComponent implements OnInit {
  reports: AuditReport[] = [];
  successCount = 0;
  failedCount = 0;

  ngOnInit(): void {
    this.reports = [
      {
        server: 'Server A',
        date: '10-Oct-2025',
        installer: 'Admin1',
        status: 'Success',
        details: 'Installation completed without issues. All modules installed successfully.'
      },
      {
        server: 'Server B',
        date: '12-Oct-2025',
        installer: 'Admin2',
        status: 'Failed',
        details: 'Database setup failed due to missing permissions on the database server.'
      },
      {
        server: 'Server C',
        date: '13-Oct-2025',
        installer: 'Admin3',
        status: 'Success',
        details: 'All modules installed. Verified configuration settings and database connectivity.'
      },
      {
        server: 'Server D',
        date: '14-Oct-2025',
        installer: 'Admin4',
        status: 'Failed',
        details: 'Configuration error: unable to write configuration file to server path. Needs manual intervention.'
      },
      {
        server: 'Server E',
        date: '15-Oct-2025',
        installer: 'Admin5',
        status: 'Success',
        details: 'Test server installed successfully with all modules configured properly.'
      },
      {
        server: 'Server F',
        date: '16-Oct-2025',
        installer: 'Admin6',
        status: 'Failed',
        details: 'Network configuration failed. Manual setup required.'
      }
    ];

    this.calculateSummary();
  }

  calculateSummary(): void {
    this.successCount = this.reports.filter(r => r.status === 'Success').length;
    this.failedCount = this.reports.filter(r => r.status === 'Failed').length;
  }
}
