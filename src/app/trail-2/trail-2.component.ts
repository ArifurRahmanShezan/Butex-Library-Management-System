import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-trail-2',
  templateUrl: './trail-2.component.html',
  styleUrls: ['./trail-2.component.css']
})
export class Trail2Component implements OnInit {
 templateForm!: FormGroup;   // <--- add !
  templates: any[] = [];       // <-- list of templates
  showModal: boolean = false;  // <-- modal visibility
  editingTemplate: any = null; // <-- currently editing template, if any

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      fields: this.fb.array([])
    });

    this.loadTemplates();
  }

  // FormArray getter
  get fields(): FormArray<FormGroup> {
    return this.templateForm.get('fields') as FormArray<FormGroup>;
  }

  addField(data: any = null): void {
    const group = this.fb.group({
      marcTag: [data?.marcTag || ''],
      marcIndicator1: [data?.marcIndicator1 || ''],
      marcIndicator2: [data?.marcIndicator2 || ''],
      subfield: [data?.subfield || ''],
      label: [data?.label || ''],
      defaultValue: [data?.defaultValue || ''],
      repeatable: [data?.repeatable || false],
      displayOrder: [data?.displayOrder || this.fields.length + 1]
    });
    this.fields.push(group);
  }

  removeField(index: number): void {
    this.fields.removeAt(index);
  }

  submit(): void {
    if (this.templateForm.invalid) {
      this.templateForm.markAllAsTouched();
      return;
    }

    const payload = this.templateForm.value;

    if (this.editingTemplate) {
      // TODO: implement update API if needed
      Object.assign(this.editingTemplate, payload);
    } else {
      this.api.createTemplate(payload).subscribe({
        next: res => {
          this.templates.push(res);
          this.closeModal();
        },
        error: err => console.error(err)
      });
    }

    this.closeModal();
  }

  loadTemplates(): void {
    this.api.getTemplates().subscribe({
      next: res => this.templates = res,
      error: err => console.error(err)
    });
  }


  

  // Open modal, optionally with a template to edit
  openModal(template: any = null): void {
    this.editingTemplate = template;

    // Reset form
    this.templateForm.reset();
    this.fields.clear();

    if (template) {
      this.templateForm.patchValue({
        name: template.name,
        description: template.description
      });

      template.fields?.forEach((f: any) => this.addField(f));
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingTemplate = null;
    this.templateForm.reset();
    this.fields.clear();
  }
}
