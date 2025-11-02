import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EodProcessComponent } from './eod-process.component';

describe('EodProcessComponent', () => {
  let component: EodProcessComponent;
  let fixture: ComponentFixture<EodProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EodProcessComponent]
    });
    fixture = TestBed.createComponent(EodProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
