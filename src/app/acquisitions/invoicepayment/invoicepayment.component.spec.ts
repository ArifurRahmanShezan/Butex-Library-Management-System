import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicepaymentComponent } from './invoicepayment.component';

describe('InvoicepaymentComponent', () => {
  let component: InvoicepaymentComponent;
  let fixture: ComponentFixture<InvoicepaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicepaymentComponent]
    });
    fixture = TestBed.createComponent(InvoicepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
