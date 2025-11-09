import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
interface Publisher {
  id: number;
  name: string;
  address: string;
  contactInfo: string;
}
@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent  implements OnInit{

  publisherForm!: FormGroup;
  publishers: Publisher[] = [];
  private nextId = 1;

  // for edit mode
  editingId: number | null = null;

  constructor(private fb: FormBuilder,private api: ApiService) {}

 ngOnInit(): void {
  this.publisherForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    address: ['', [Validators.required, Validators.maxLength(250)]],
    contactInfo: ['', [Validators.required, Validators.maxLength(60)]],
  });

  // Load publishers from API
  this.loadPublishers();
}

  get f() { return this.publisherForm.controls; }

  editPublisher(p: Publisher): void {
    this.editingId = p.id;
    this.publisherForm.setValue({
      name: p.name,
      address: p.address,
      contactInfo: p.contactInfo
    });
    // focus logic (optional) could be added with ViewChild
  }

  cancelEdit(): void {
    this.editingId = null;
    this.publisherForm.reset();
  }

  deletePublisher(id: number): void {
    if (!confirm('Delete this publisher?')) return;
    this.api.deletePublisher(id).subscribe(
      res => {
        this.loadPublishers();
      },
      err => console.error("Error deleting publisher", err)
    );
  }

  trackById(index: number, item: Publisher) {
    return item.id;
  }
  

  loadPublishers() {
  this.api.getAllPublisher().subscribe(
    (res) => {
      this.publishers = res;
    },
    (err) => {
      console.error('Error loading publishers', err);
    }
  );
}
addOrUpdatePublisher(): void {
  if (this.publisherForm.invalid) {
    this.publisherForm.markAllAsTouched();
    return;
  }

  const payload = {
    name: this.f['name'].value.trim(),
    address: this.f['address'].value.trim(),
    contactInfo: this.f['contactInfo'].value.trim()
  };

  if (this.editingId === null) {

    //  SEND TO API
    this.api.addPublisher(payload).subscribe(
      res => {
        this.loadPublishers();   // reload list from server
        this.publisherForm.reset();
      },
      err => console.error("Error adding publisher", err)
    );

  } else {

    //  UPDATE TO API
    this.api.updatePublisher(this.editingId, payload).subscribe(
      res => {
        this.loadPublishers();
        this.editingId = null;
        this.publisherForm.reset();
      },
      err => console.error("Error updating publisher", err)
    );
  }
}} 
