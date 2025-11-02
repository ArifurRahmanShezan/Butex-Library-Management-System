import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsForProcessingComponent } from './items-for-processing.component';

describe('ItemsForProcessingComponent', () => {
  let component: ItemsForProcessingComponent;
  let fixture: ComponentFixture<ItemsForProcessingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsForProcessingComponent]
    });
    fixture = TestBed.createComponent(ItemsForProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
