import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolyearsListComponent } from './schoolyears-list.component';

describe('SchoolyearsListComponent', () => {
  let component: SchoolyearsListComponent;
  let fixture: ComponentFixture<SchoolyearsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolyearsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolyearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
