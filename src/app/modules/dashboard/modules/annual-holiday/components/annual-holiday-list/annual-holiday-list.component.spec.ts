import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualHolidayComponent } from './annual-holiday-list.component';

describe('AnnualHolidayComponent', () => {
  let component: AnnualHolidayComponent;
  let fixture: ComponentFixture<AnnualHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
