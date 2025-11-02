import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionsReportComponent } from './acquisitions-report.component';

describe('AcquisitionsReportComponent', () => {
  let component: AcquisitionsReportComponent;
  let fixture: ComponentFixture<AcquisitionsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcquisitionsReportComponent]
    });
    fixture = TestBed.createComponent(AcquisitionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
