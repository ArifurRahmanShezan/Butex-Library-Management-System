import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossComponent } from './loss.component';

describe('LossComponent', () => {
  let component: LossComponent;
  let fixture: ComponentFixture<LossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LossComponent]
    });
    fixture = TestBed.createComponent(LossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
