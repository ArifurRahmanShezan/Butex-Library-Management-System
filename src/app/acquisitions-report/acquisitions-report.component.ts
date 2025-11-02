import { Component, OnInit } from '@angular/core';

interface AcquisitionRequest {
  id: string;
  date: string;
  vendor: string;
  item: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  remarks: string;
}

@Component({
  selector: 'app-acquisitions-report',
  templateUrl: './acquisitions-report.component.html',
  styleUrls: ['./acquisitions-report.component.css']
})
export class AcquisitionsReportComponent implements OnInit {
  requests: AcquisitionRequest[] = [];

  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  ngOnInit(): void {
    this.requests = [
      {
        id: 'REQ-101',
        date: '10-Oct-2025',
        vendor: 'Vendor A',
        item: 'Books',
        status: 'Pending',
        remarks: 'Awaiting approval from acquisitions head.'
      },
      {
        id: 'REQ-102',
        date: '12-Oct-2025',
        vendor: 'Vendor B',
        item: 'Stationery',
        status: 'Approved',
        remarks: 'Approved by Finance department.'
      },
      {
        id: 'REQ-103',
        date: '13-Oct-2025',
        vendor: 'Vendor C',
        item: 'Computers',
        status: 'Rejected',
        remarks: 'Insufficient budget allocation.'
      },
      {
        id: 'REQ-104',
        date: '14-Oct-2025',
        vendor: 'Vendor D',
        item: 'Furniture',
        status: 'Approved',
        remarks: 'Approved for immediate purchase.'
      }
    ];

    this.calculateSummary();
  }

  calculateSummary(): void {
    this.pendingCount = this.requests.filter(r => r.status === 'Pending').length;
    this.approvedCount = this.requests.filter(r => r.status === 'Approved').length;
    this.rejectedCount = this.requests.filter(r => r.status === 'Rejected').length;
  }
}
