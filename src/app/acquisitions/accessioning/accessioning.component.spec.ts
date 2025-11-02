import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessioningComponent } from './accessioning.component';

describe('AccessioningComponent', () => {
  let component: AccessioningComponent;
  let fixture: ComponentFixture<AccessioningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessioningComponent]
    });
    fixture = TestBed.createComponent(AccessioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
