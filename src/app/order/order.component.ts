import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  vendors: any[] = [];
  orders: any[] = [];
  selectedOrder: any = null;

  // ✅ Modal visibility flags
  showAddModal = false;
  showItemsModal = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadVendors();
    this.loadOrders();
  }

  initForm() {
    this.orderForm = this.fb.group({
      vendorId: ['', Validators.required],
      notes: [''],
      items: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      author: [''],
      publisher: [''],
      publicationYear: [''],
      isbn: [''],
      quantity: [1, Validators.required],
      price: [0, Validators.required]
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }

  loadVendors() {
    this.api.getAllVendor().subscribe(v => (this.vendors = v));
  }

  loadOrders() {
    this.api.getOredr().subscribe(o => (this.orders = o));
  }

  // ✅ Reactive modal handling
  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  openItemsModal(order: any) {
    this.selectedOrder = order;
    this.showItemsModal = true;
  }

  closeItemsModal() {
    this.showItemsModal = false;
  }

  submitOrder() {
    if (this.orderForm.valid) {
      this.api.addOrder(this.orderForm.value).subscribe(() => {
        alert('Order added successfully!');
        this.closeAddModal();
        this.orderForm.reset();
        this.items.clear();
        this.addItem();
        this.loadOrders();
      });
    }
  }
}
