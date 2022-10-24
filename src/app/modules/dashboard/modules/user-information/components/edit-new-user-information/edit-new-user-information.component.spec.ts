import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserInformationComponent } from './edit-new-user-information.component';

describe('AddEditUserInformationComponent', () => {
  let component: AddEditUserInformationComponent;
  let fixture: ComponentFixture<AddEditUserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUserInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
