import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserInformationComponent } from './add-new-user-information.component';

describe('AddNewUserInformationComponent', () => {
  let component: AddNewUserInformationComponent;
  let fixture: ComponentFixture<AddNewUserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewUserInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
