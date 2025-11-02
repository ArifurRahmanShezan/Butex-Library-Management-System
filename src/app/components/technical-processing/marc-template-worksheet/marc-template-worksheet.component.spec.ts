import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcTemplateWorksheetComponent } from './marc-template-worksheet.component';

describe('MarcTemplateWorksheetComponent', () => {
  let component: MarcTemplateWorksheetComponent;
  let fixture: ComponentFixture<MarcTemplateWorksheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcTemplateWorksheetComponent]
    });
    fixture = TestBed.createComponent(MarcTemplateWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
