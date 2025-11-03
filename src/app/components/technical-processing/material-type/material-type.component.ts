import { Component } from '@angular/core';

@Component({
  selector: 'app-material-index',
  templateUrl: './material-type.component.html',
  styleUrls: ['./material-type.component.css']
})
export class MaterialTypeComponent {
  // Tab state
  activeTab: 'material' | 'indexes' = 'material';

  // Material type fields
  materialName = '';
  materialDesc = '';

  // Custom index fields
  indexName = '';
  selectedField = '';

  // Available fields
  availableFields = ['Title', 'Author', 'ISBN', 'Publisher', 'Subject'];

  // List of created indexes
  indexList: { name: string; field: string }[] = [];
  materialList: { name: string; desc: string }[] = [];

  setTab(tab: 'material' | 'indexes') {
    this.activeTab = tab;
  }

  addMaterialType() {
    if (!this.materialName.trim()) return;

    this.materialList.push({
      name: this.materialName.trim(),
      desc: this.materialDesc.trim()
    });

    this.materialName = '';
    this.materialDesc = '';
  }
  addCustomIndex() {
    if (!this.indexName.trim() || !this.selectedField) return;
    this.indexList.push({
      name: this.indexName.trim(),
      field: this.selectedField
    });
    this.indexName = '';
    this.selectedField = '';
  }
}
