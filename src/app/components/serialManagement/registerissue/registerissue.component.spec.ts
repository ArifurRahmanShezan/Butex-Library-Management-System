import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterissueComponent } from './registerissue.component';

describe('RegisterissueComponent', () => {
  let component: RegisterissueComponent;
  let fixture: ComponentFixture<RegisterissueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterissueComponent]
    });
    fixture = TestBed.createComponent(RegisterissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
