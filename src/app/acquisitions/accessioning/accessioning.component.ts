import { Component,OnInit  } from '@angular/core';
// import JsBarcode from 'jsbarcode';

interface AccessionRecord {
  itemID: string;
  accessionNo: string;
  barcode: string;
}
@Component({
  selector: 'app-accessioning',
  templateUrl: './accessioning.component.html',
  styleUrls: ['./accessioning.component.css']
})
export class AccessioningComponent implements OnInit{
  itemID: string = '';
  accessionNo: string = '';
  barcode: string = '';
  successMsg: boolean = false;

  records: AccessionRecord[] = [];

  ngOnInit() {
    this.accessionNo = this.generateAccessionNo();
  }

  generateAccessionNo(): string {
    return 'ACC-' + Math.floor(100000 + Math.random() * 900000);
  }

  generateBarcode() {
    this.barcode = 'BC-' + Math.floor(100000000 + Math.random() * 900000000);
  }

  submitRecord() {
    if (!this.itemID || !this.accessionNo || !this.barcode) return;

    this.records.push({
      itemID: this.itemID,
      accessionNo: this.accessionNo,
      barcode: this.barcode
    });

    this.successMsg = true;
    setTimeout(() => this.successMsg = false, 2500);

    // Reset form
    this.itemID = '';
    this.accessionNo = this.generateAccessionNo();
    this.barcode = '';
  }

  trackByIndex(index: number, item: AccessionRecord) {
    return index;
  }
}

