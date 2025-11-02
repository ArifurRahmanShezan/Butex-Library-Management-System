import { Component } from '@angular/core';

interface CatalogEntry {
  col1: string;
  col2: string;
  col3: string;
  added: string;
}

@Component({
  selector: 'app-cataloging-template',
  templateUrl: './cataloging-template.component.html',
  styleUrls: ['./cataloging-template.component.css']
})
export class CatalogingTemplateComponent {
  catalogEntries: CatalogEntry[] = [];

  simple = {
    title: '',
    author: '',
    isbn: '',
    date: ''
  };

  general = {
    marc: '',
    notes: ''
  };

  addSimpleCatalog() {
    const now = new Date().toLocaleString();
    this.catalogEntries.push({
      col1: this.simple.title,
      col2: this.simple.author,
      col3: `${this.simple.isbn} / ${this.simple.date}`,
      added: now
    });
    this.simple = { title: '', author: '', isbn: '', date: '' };
  }

  addGeneralCatalog() {
    const now = new Date().toLocaleString();
    this.catalogEntries.push({
      col1: this.general.marc,
      col2: this.general.notes,
      col3: '-',
      added: now
    });
    this.general = { marc: '', notes: '' };
  }
}
