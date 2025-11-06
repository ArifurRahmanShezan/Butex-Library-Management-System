import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trail4Component } from './trail-4.component';

describe('Trail4Component', () => {
  let component: Trail4Component;
  let fixture: ComponentFixture<Trail4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Trail4Component]
    });
    fixture = TestBed.createComponent(Trail4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
