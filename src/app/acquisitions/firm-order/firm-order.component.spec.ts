import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmOrderComponent } from './firm-order.component';

describe('FirmOrderComponent', () => {
  let component: FirmOrderComponent;
  let fixture: ComponentFixture<FirmOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmOrderComponent]
    });
    fixture = TestBed.createComponent(FirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
