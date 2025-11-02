import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProcessingComponent } from './request-processing.component';

describe('RequestProcessingComponent', () => {
  let component: RequestProcessingComponent;
  let fixture: ComponentFixture<RequestProcessingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestProcessingComponent]
    });
    fixture = TestBed.createComponent(RequestProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
