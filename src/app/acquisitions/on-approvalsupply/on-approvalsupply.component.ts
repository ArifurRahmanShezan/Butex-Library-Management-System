import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-on-approvalsupply',
    templateUrl: './on-approvalsupply.component.html',
    styleUrls: ['./on-approvalsupply.component.css']
})
export class OnApprovalsupplyComponent implements AfterViewInit {
  vendors = ['Central Books Ltd', 'Campus Supplies', 'Paper & Co.', 'Historical Bindery'];

  requests: any[] = [];
  received: any[] = [];
  inventory: Record<string, number> = {};

  reqTitle = '';
  reqQty = 1;
  reqVendor = this.vendors[0];
  reqId = '';

  csvHeaders: string[] = [];
  csvRows: string[][] = [];
  csvPreviewText = '';
  mapFields = ['ItemID', 'Title', 'Vendor', 'Quantity'];
  mapping: Record<string, string> = {};

  receiptRows: any[] = [];
  receivedDate = '';
  selectedRequest = '';
  selectedReceived = '';
  approvalStatus = 'Pending';
  approvalComments = '';

  totalItems = 0;
  uniqueSKUs = 0;
  totalReceived = 0;
  totalApproved = 0;

  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.seedDemo();
    this.refreshAll();
  }

  uid(prefix: string = 'R') {
    return prefix + Date.now().toString(36).slice(-6);
  }

  /* ===== Requests ===== */
  submitRequest() {
    if (!this.reqTitle || this.reqQty < 1) return alert('Provide a title and quantity.');
    const id = this.uid('REQ');
    this.requests.push({ id, title: this.reqTitle, vendor: this.reqVendor, qty: this.reqQty, status: 'Requested' });
    this.reqId = id;
    this.reqTitle = '';
    this.reqQty = 1;
    this.refreshAll();
  }

  clearRequest() {
    this.reqTitle = '';
    this.reqQty = 1;
    this.reqId = '';
  }

  /* ===== CSV Import ===== */
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.parseCSV(reader.result as string);
    reader.readAsText(file);
  }

  parseCSV(text: string) {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 1) return alert('Empty CSV');
    this.csvHeaders = this.parseCSVLine(lines[0]);
    this.csvRows = lines.slice(1).map(l => this.parseCSVLine(l));
    this.csvPreviewText = 'Detected columns: ' + this.csvHeaders.join(' • ');
  }

  parseCSVLine(line: string) {
    const out: string[] = [];
    let cur = '', inQuotes = false;
    for (let ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { out.push(cur); cur = ''; continue; }
      cur += ch;
    }
    out.push(cur);
    return out.map(s => s.trim());
  }

  importCSV() {
    if (!this.csvRows.length) return alert('No CSV loaded.');
    const mapIdx: Record<string, number> = {};
    this.mapFields.forEach(f => mapIdx[f] = this.csvHeaders.indexOf(this.mapping[f]));
    let count = 0;
    this.csvRows.forEach(row => {
      const title = row[mapIdx['Title']] || `Imported ${count + 1}`;
      const vendor = row[mapIdx['Vendor']] || this.vendors[0];
      const qty = parseInt(row[mapIdx['Quantity']] || '1');
      const id = row[mapIdx['ItemID']] || this.uid('IMP');
      this.requests.push({ id, title, vendor, qty, status: 'Imported' });
      count++;
    });
    this.csvRows = [];
    this.csvHeaders = [];
    this.csvPreviewText = '';
    this.refreshAll();
    alert(`${count} rows imported.`);
  }

  cancelImport() {
    this.csvHeaders = [];
    this.csvRows = [];
    this.csvPreviewText = '';
  }

  /* ===== Receipt ===== */
  addReceiptRow() {
    if (this.selectedRequest) {
      const r = this.requests.find(x => x.id === this.selectedRequest);
      if (r) this.receiptRows.push({ ...r, itemId: r.id, condition: 'Good' });
    } else {
      this.receiptRows.push({ itemId: this.uid('ITM'), title: 'New Item', vendor: this.vendors[0], qty: 1, condition: 'Good' });
    }
  }

  removeReceiptRow(i: number) {
    this.receiptRows.splice(i, 1);
  }

  clearReceipt() {
    this.receiptRows = [];
  }

  submitReceipt() {
    if (!this.receiptRows.length) return alert('No rows.');
    const date = this.receivedDate || new Date().toISOString().slice(0, 10);
    this.receiptRows.forEach(r => {
      this.received.push({ ...r, id: this.uid('RCV'), receivedDate: date, status: 'Pending', comments: '' });
    });
    this.receiptRows = [];
    this.receivedDate = '';
    this.refreshAll();
  }

  /* ===== Approval ===== */
  submitApproval() {
    const rcv = this.received.find(r => r.itemId === this.selectedReceived);
    if (!rcv) return alert('Select item');
    rcv.status = this.approvalStatus;
    rcv.comments = this.approvalComments;
    if (rcv.status === 'Approved') {
      this.inventory[rcv.title] = (this.inventory[rcv.title] || 0) + rcv.qty;
    }
    this.refreshAll();
  }

  bulkApprove() {
    const pending = this.received.filter(r => r.status === 'Pending');
    pending.forEach(r => {
      r.status = 'Approved';
      this.inventory[r.title] = (this.inventory[r.title] || 0) + r.qty;
    });
    this.refreshAll();
  }

  /* ===== Inventory ===== */
  get inventoryKeys() {
    return Object.keys(this.inventory);
  }

  renderInventory() {
    this.totalItems = Object.values(this.inventory).reduce((a, b) => a + b, 0);
    this.uniqueSKUs = Object.keys(this.inventory).length;
  }

  drawChart() {
    if (!this.barChart) return;
    const ctx = this.barChart.nativeElement.getContext('2d')!;
    const totalReceived = this.received.reduce((a, r) => a + r.qty, 0);
    const totalApproved = this.received.filter(r => r.status === 'Approved').reduce((a, r) => a + r.qty, 0);
    this.totalReceived = totalReceived;
    this.totalApproved = totalApproved;

    const w = 340, h = 240, pad = 28;
    ctx.clearRect(0, 0, w, h);
    const maxV = Math.max(totalReceived, totalApproved, 1);
    const barW = 60;
    const baseY = h - pad;
    const scale = (h - 2 * pad) / maxV;
    const bars = [
      { label: 'Received', value: totalReceived, color: '#5b8def' },
      { label: 'Approved', value: totalApproved, color: '#2c5ea8' }
    ];
    bars.forEach((b, i) => {
      const x = pad + i * (barW + 40);
      const y = baseY - b.value * scale;
      ctx.fillStyle = b.color;
      ctx.fillRect(x, y, barW, b.value * scale);
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText(b.label, x, baseY + 14);
      ctx.fillText(b.value.toString(), x + 10, y - 4);
    });
  }

  refreshAll() {
    this.renderInventory();
    this.drawChart();
  }

  seedDemo() {
    this.requests.push(
      { id: 'REQ100', title: 'Archival Boxes', vendor: 'Historical Bindery', qty: 10, status: 'Requested' },
      { id: 'REQ101', title: 'A4 Paper', vendor: 'Campus Supplies', qty: 50, status: 'Imported' }
    );
  }
}



