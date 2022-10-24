import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewAnnualHolidayComponent } from './edit-new-annual-holiday.component';

describe('EditNewAnnualHolidayComponent', () => {
  let component: EditNewAnnualHolidayComponent;
  let fixture: ComponentFixture<EditNewAnnualHolidayComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewAnnualHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewAnnualHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
