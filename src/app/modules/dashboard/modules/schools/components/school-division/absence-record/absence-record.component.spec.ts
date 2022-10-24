import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceRecordComponent } from './absence-record.component';

describe('AbsenceRecordComponent', () => {
  let component: AbsenceRecordComponent;
  let fixture: ComponentFixture<AbsenceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
