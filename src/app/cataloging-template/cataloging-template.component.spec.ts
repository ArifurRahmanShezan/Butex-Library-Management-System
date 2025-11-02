import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogingTemplateComponent } from './cataloging-template.component';

describe('CatalogingTemplateComponent', () => {
  let component: CatalogingTemplateComponent;
  let fixture: ComponentFixture<CatalogingTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogingTemplateComponent]
    });
    fixture = TestBed.createComponent(CatalogingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
