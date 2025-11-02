import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnApprovalsupplyComponent } from './on-approvalsupply.component';

describe('OnApprovalsupplyComponent', () => {
  let component: OnApprovalsupplyComponent;
  let fixture: ComponentFixture<OnApprovalsupplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnApprovalsupplyComponent]
    });
    fixture = TestBed.createComponent(OnApprovalsupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
