import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronprevilegeComponent } from './patronprevilege.component';

describe('PatronprevilegeComponent', () => {
  let component: PatronprevilegeComponent;
  let fixture: ComponentFixture<PatronprevilegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatronprevilegeComponent]
    });
    fixture = TestBed.createComponent(PatronprevilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
