import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-request-admin',
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.css']
})
export class RequestAdminComponent implements OnInit {

  requests: any[] = [];
  statusForm!: FormGroup;
  showModal = false;
  selectedRequestId: number | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.loadRequests();
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
      justification: ['', Validators.required]
    });
  }

  loadRequests() {
    this.api.getRequest().subscribe({
      next: (data) => this.requests = data,
      error: (err) => console.error('Error fetching requests:', err)
    });
  }

  openModal(id: number) {
    this.selectedRequestId = id;
    this.showModal = true;
    this.statusForm.reset();
  }

  closeModal() {
    this.showModal = false;
    this.selectedRequestId = null;
  }

  onSubmitStatus() {
    if (this.statusForm.invalid || !this.selectedRequestId) return;

    this.isSubmitting = true;
    const formValue = this.statusForm.value;

    this.api.approveReq(this.selectedRequestId, formValue).subscribe({
      next: () => {
        alert('Request status updated successfully!');
        this.isSubmitting = false;
        this.closeModal();
        this.loadRequests();
      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.isSubmitting = false;
      }
    });
  }
}
