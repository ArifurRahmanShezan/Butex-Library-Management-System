import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersHolidaysComponent } from './letters-holidays.component';

describe('LettersHolidaysComponent', () => {
  let component: LettersHolidaysComponent;
  let fixture: ComponentFixture<LettersHolidaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LettersHolidaysComponent]
    });
    fixture = TestBed.createComponent(LettersHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
