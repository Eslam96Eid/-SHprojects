import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsReportsComponent } from './students-reports.component';

describe('StudentsReportsComponent', () => {
  let component: StudentsReportsComponent;
  let fixture: ComponentFixture<StudentsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
