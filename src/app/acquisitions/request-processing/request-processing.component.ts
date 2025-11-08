import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-request-processing',
  templateUrl: './request-processing.component.html',
  styleUrls: ['./request-processing.component.css']
})
export class RequestProcessingComponent implements OnInit {

  
  showModal = false;
  requestForm!: FormGroup;
  requests: any[] = [];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadRequests();
  }

  // Initialize form fields
  initForm() {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: [''],
      publicationYear: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      isbn: ['', Validators.required],
      requesterName: ['', Validators.required],
      requesterEmail: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      notes: ['']
    });
  }

  // Load existing requests
  loadRequests() {
    this.api.getRequest().subscribe({
      next: (data: any[]) => this.requests = data,
      error: (err: any[]) => console.error('Error fetching requests:', err)
    });
  }

  // Submit new request
  onSubmit() {
    if (this.requestForm.invalid) return;

    this.isSubmitting = true;
    this.api.addRequest(this.requestForm.value).subscribe({
      next: () => {
        alert('Book request submitted successfully!');
        this.requestForm.reset();
        this.isSubmitting = false;
        this.loadRequests(); // refresh list
      },
      error: (err: any[]) => {
        console.error('Error submitting request:', err);
        this.isSubmitting = false;
      }
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
