// import { Component } from '@angular/core';
// interface RequestItem {
//   id: string;
//   title: string;
//   vendor: string;
//   qty: number;
//   status: string;
// }
// @Component({
//   selector: 'app-on-approvalsupply',
//   templateUrl: './on-approvalsupply.component.html',
//   styleUrls: ['./on-approvalsupply.component.css']
// })
// export class OnApprovalsupplyComponent {

//   vendors: string[] = ['Central Books Ltd', 'Campus Supplies', 'Paper & Co.', 'Historical Bindery'];
//   requests: Request[] = [];

//   reqTitle: string = '';
//   reqQty: number = 1;
//   selectedVendor: string = this.vendors[0];
//   generatedId: string = '';

//   submitRequest(): void {
//     if (!this.reqTitle || this.reqQty < 1) {
//       alert('Please provide a title and a valid quantity.');
//       return;
//     }

//     // ✅ Generate a unique ID
//     const generatedId: string = 'REQ-' + Math.random().toString(36).substring(2, 8).toUpperCase();
//     this.generatedId = generatedId;

//     const newReq: Request = {
//       id: generatedId,
//       title: this.reqTitle,
//       vendor: this.selectedVendor,
//       qty: this.reqQty,
//       status: 'Requested'
//     };

//     this.requests.push(newReq);
//     this.clearRequestForm();
//   }

//   clearRequestForm(): void {
//     this.reqTitle = '';
//     this.reqQty = 1;
//     this.generatedId = '';
//   }
// }










