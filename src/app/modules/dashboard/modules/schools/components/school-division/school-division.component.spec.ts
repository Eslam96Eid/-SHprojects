import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDivisionComponent } from './school-division.component';

describe('SchoolDivisionComponent', () => {
  let component: SchoolDivisionComponent;
  let fixture: ComponentFixture<SchoolDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
