import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronManagementComponent } from './patron-management.component';

describe('PatronManagementComponent', () => {
  let component: PatronManagementComponent;
  let fixture: ComponentFixture<PatronManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatronManagementComponent]
    });
    fixture = TestBed.createComponent(PatronManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
