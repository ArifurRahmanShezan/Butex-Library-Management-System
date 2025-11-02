import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypeComponent } from './material-type.component';

describe('MaterialTypeComponent', () => {
  let component: MaterialTypeComponent;
  let fixture: ComponentFixture<MaterialTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTypeComponent]
    });
    fixture = TestBed.createComponent(MaterialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
