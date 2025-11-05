import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronCategoryComponent } from './patron-category.component';

describe('PatronCategoryComponent', () => {
  let component: PatronCategoryComponent;
  let fixture: ComponentFixture<PatronCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatronCategoryComponent]
    });
    fixture = TestBed.createComponent(PatronCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
