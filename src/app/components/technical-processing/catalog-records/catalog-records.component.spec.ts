import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogRecordsComponent } from './catalog-records.component';

describe('CatalogRecordsComponent', () => {
  let component: CatalogRecordsComponent;
  let fixture: ComponentFixture<CatalogRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogRecordsComponent]
    });
    fixture = TestBed.createComponent(CatalogRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
