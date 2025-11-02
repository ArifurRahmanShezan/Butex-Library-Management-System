import { Component } from '@angular/core';

interface MarcField {
  tag: string;
  field: string;
  indicator: string;
}

interface MarcTemplate {
  name: string;
  fields: MarcField[];
  created: string;
}

@Component({
  selector: 'app-marc-template-worksheet',
  templateUrl: './marc-template-worksheet.component.html',
  styleUrls: ['./marc-template-worksheet.component.css']
})
export class MarcTemplateWorksheetComponent {
  templateName: string = '';
  marcFields: MarcField[] = [];
  templates: MarcTemplate[] = [];


  formatFields(fields: { tag: string; field: string }[]): string {
    return fields.map(f => `${f.tag}:${f.field}`).join(', ');
  }

  addRow() {
    this.marcFields.push({ tag: '', field: '', indicator: '' });
  }

  removeRow(index: number) {
    this.marcFields.splice(index, 1);
  }

  saveTemplate() {
    if (!this.templateName.trim()) return;

    const newTemplate: MarcTemplate = {
      name: this.templateName.trim(),
      fields: [...this.marcFields],
      created: new Date().toLocaleString()
    };

    this.templates.push(newTemplate);

    // Reset form
    this.templateName = '';
    this.marcFields = [];
  }
}
