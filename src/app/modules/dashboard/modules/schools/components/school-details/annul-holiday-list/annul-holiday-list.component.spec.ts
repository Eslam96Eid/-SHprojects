import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulHolidayListComponent } from './annul-holiday-list.component';

describe('AnnulHolidayListComponent', () => {
  let component: AnnulHolidayListComponent;
  let fixture: ComponentFixture<AnnulHolidayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnulHolidayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnulHolidayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
