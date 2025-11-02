import { Component } from '@angular/core';

@Component({
  selector: 'app-material-index',
  templateUrl: './material-type.component.html',
  styleUrls: ['./material-type.component.css']
})
export class MaterialTypeComponent {
  // Material type fields
  materialName: string = '';
  materialDesc: string = '';

  // Custom index fields
  indexName: string = '';
  selectedFields: string[] = [];

  // Available fields
  availableFields: string[] = ['Title', 'Author', 'ISBN', 'Publisher', 'Subject'];

  // List of created indexes
  indexList: { name: string; fields: string[] }[] = [];

  addMaterialType() {
    if (!this.materialName.trim()) return;
    alert(`Material Type "${this.materialName}" added successfully.`);
    this.materialName = '';
    this.materialDesc = '';
  }

  addCustomIndex() {
    if (!this.indexName.trim() || this.selectedFields.length === 0) return;
    this.indexList.push({
      name: this.indexName,
      fields: [...this.selectedFields]
    });
    this.indexName = '';
    this.selectedFields = [];
  }
}
