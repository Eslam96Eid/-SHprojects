import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayModelComponent } from './holiday-model.component';

describe('HolidayModelComponent', () => {
  let component: HolidayModelComponent;
  let fixture: ComponentFixture<HolidayModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
