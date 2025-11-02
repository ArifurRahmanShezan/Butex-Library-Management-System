import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialsBindingManagementComponent } from './serials-binding-management.component';

describe('SerialsBindingManagementComponent', () => {
  let component: SerialsBindingManagementComponent;
  let fixture: ComponentFixture<SerialsBindingManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerialsBindingManagementComponent]
    });
    fixture = TestBed.createComponent(SerialsBindingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
