import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityFilesManagementComponent } from './authority-files-management.component';

describe('AuthorityFilesManagementComponent', () => {
  let component: AuthorityFilesManagementComponent;
  let fixture: ComponentFixture<AuthorityFilesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorityFilesManagementComponent]
    });
    fixture = TestBed.createComponent(AuthorityFilesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
