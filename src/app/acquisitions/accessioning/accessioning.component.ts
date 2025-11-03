import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import * as JsBarcode from 'jsbarcode';


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
export class AccessioningComponent implements AfterViewInit {
  itemID: string = '';
  accessionNo: string = '';
  barcode: string = '';
  successVisible: boolean = false;

  records: AccessionRecord[] = [];

  @ViewChildren('barcodeSVG') barcodeSVGs!: QueryList<ElementRef<SVGSVGElement>>;

  constructor() {
    this.accessionNo = this.generateAccessionNo();
  }

  ngAfterViewInit() {
    this.renderBarcodes();
  }

  generateAccessionNo(): string {
    return 'ACC-' + Math.floor(100000 + Math.random() * 900000);
  }

  generateBarcode() {
    this.barcode = 'BC-' + Math.floor(100000000 + Math.random() * 900000000);
  }

  onSubmit() {
    if (!this.itemID || !this.barcode) return;

    const newRecord: AccessionRecord = {
      itemID: this.itemID,
      accessionNo: this.accessionNo,
      barcode: this.barcode
    };

    this.records.push(newRecord);
    this.successVisible = true;

    setTimeout(() => (this.successVisible = false), 2500);

    // Reset form fields
    this.itemID = '';
    this.barcode = '';
    this.accessionNo = this.generateAccessionNo();

    setTimeout(() => this.renderBarcodes(), 0);
  }

  private renderBarcodes() {
    this.barcodeSVGs.forEach((svgRef, index) => {
      const record = this.records[index];
      JsBarcode(svgRef.nativeElement, record.barcode, {
        format: 'CODE128',
        width: 2,
        height: 40,
        displayValue: true
      });
    });
  }
}
