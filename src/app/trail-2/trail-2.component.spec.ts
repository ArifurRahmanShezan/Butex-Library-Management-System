import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trail2Component } from './trail-2.component';

describe('Trail2Component', () => {
  let component: Trail2Component;
  let fixture: ComponentFixture<Trail2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Trail2Component]
    });
    fixture = TestBed.createComponent(Trail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
