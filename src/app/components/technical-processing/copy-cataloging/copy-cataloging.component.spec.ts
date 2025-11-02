import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyCatalogingComponent } from './copy-cataloging.component';

describe('CopyCatalogingComponent', () => {
  let component: CopyCatalogingComponent;
  let fixture: ComponentFixture<CopyCatalogingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopyCatalogingComponent]
    });
    fixture = TestBed.createComponent(CopyCatalogingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
