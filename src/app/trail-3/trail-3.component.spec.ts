import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trail3Component } from './trail-3.component';

describe('Trail3Component', () => {
  let component: Trail3Component;
  let fixture: ComponentFixture<Trail3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Trail3Component]
    });
    fixture = TestBed.createComponent(Trail3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
