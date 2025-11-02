import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

interface Request {
    id: string;
    title: string;
    vendor: string;
    qty: number;
    status: string;
}

interface ReceivedItem {
    id: string;
    title: string;
    qty: number;
    status: string;
}

@Component({
    selector: 'app-on-approvalsupply',
    templateUrl: './on-approvalsupply.component.html',
    styleUrls: ['./on-approvalsupply.component.css']
})
export class OnApprovalsupplyComponent implements OnInit {

    @ViewChild('barChart', { static: true }) barChart!: ElementRef<HTMLCanvasElement>;

    vendors = ['Central Books Ltd', 'Campus Supplies', 'Paper & Co.', 'Historical Bindery'];
    requests: Request[] = [];
    receivedItems: ReceivedItem[] = [];
    inventory: Record<string, number> = {};

    reqTitle = '';
    reqQty = 1;
    reqVendor = this.vendors[0];
    reqId = '';

    receiptReqId = '';
    receiptQty = 1;

    approveItemId = '';

    totalItems = 0;
    uniqueSKUs = 0;
    totalReceived = 0;
    totalApproved = 0;

    get inventoryKeys() {
        return Object.keys(this.inventory);
    }

    ngOnInit() {
        // Demo seed
        this.requests = [
            { id: this.uid('REQ'), title: 'A4 Printer Paper (80gsm)', vendor: this.vendors[0], qty: 10, status: 'Requested' },
            { id: this.uid('REQ'), title: 'Library Card Covers', vendor: this.vendors[1], qty: 50, status: 'Requested' },
        ];
        this.refreshStats();
        this.drawChart();
    }

    // 🟢 Request form
    onSubmitRequest(e: Event) {
        e.preventDefault();
        if (!this.reqTitle || this.reqQty < 1) return alert('Please provide title and quantity.');
        const id = this.uid('REQ');
        this.requests.push({
            id,
            title: this.reqTitle,
            vendor: this.reqVendor,
            qty: this.reqQty,
            status: 'Requested'
        });
        this.reqId = id;
        this.clearRequest();
        this.refreshStats();
        this.drawChart();
    }

    clearRequest() {
        this.reqTitle = '';
        this.reqQty = 1;
        this.reqVendor = this.vendors[0];
        this.reqId = '';
    }

    // 🟠 Import Config
    onFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            alert(`Selected: ${file.name}`);
        }
    }

    onImport(e: Event) {
        e.preventDefault();
        // Simulate importing 2 demo requests
        const imported = [
            { id: this.uid('REQ'), title: 'Archival Boxes', vendor: 'Campus Supplies', qty: 5, status: 'Imported' },
            { id: this.uid('REQ'), title: 'Book Binding Tape', vendor: 'Historical Bindery', qty: 8, status: 'Imported' }
        ];
        this.requests.push(...imported);
        this.refreshStats();
        this.drawChart();
    }

    // 🟣 Receipt
    onReceive(e: Event) {
        e.preventDefault();
        const req = this.requests.find(r => r.id === this.receiptReqId);
        if (!req) return alert('Select a valid Request ID.');
        const qty = this.receiptQty || req.qty;
        const itemId = this.uid('RCV');
        this.receivedItems.push({ id: itemId, title: req.title, qty, status: 'Received' });
        req.status = 'Received';
        this.inventory[req.title] = (this.inventory[req.title] || 0) + qty;
        this.refreshStats();
        this.drawChart();
    }

    // 🔵 Approval
    onApprove(e: Event) {
        e.preventDefault();
        const item = this.receivedItems.find(i => i.id === this.approveItemId);
        if (!item) return alert('Select a received item.');
        item.status = 'Approved';
        this.totalApproved++;
        this.drawChart();
    }

    // 🧮 Helpers
    refreshStats() {
        this.totalItems = Object.values(this.inventory).reduce((a, b) => a + (b || 0), 0);
        this.uniqueSKUs = Object.keys(this.inventory).length;
        this.totalReceived = this.receivedItems.reduce((a, r) => a + r.qty, 0);
    }

    drawChart() {
        const ctx = this.barChart.nativeElement.getContext('2d');
        if (!ctx) return;
        const received = this.totalReceived;
        const approved = this.receivedItems.filter(i => i.status === 'Approved')
            .reduce((a, b) => a + b.qty, 0);

        ctx.clearRect(0, 0, 340, 240);
        ctx.fillStyle = '#b07a4b';
        ctx.fillRect(100, 200 - received, 50, received);
        ctx.fillStyle = '#6a4528';
        ctx.fillRect(200, 200 - approved, 50, approved);
    }

    uid(prefix = 'R') {
        return prefix + Date.now().toString(36).slice(-6);
    }
}










