import { ComponentFixture, TestBed } from '@angular/core/testing';

import { editnewassessmentComponent } from './edit-new-assessment.component';

describe('EditAddNewAssessmentComponent', () => {
  let component: editnewassessmentComponent ;
  let fixture: ComponentFixture<editnewassessmentComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ editnewassessmentComponent  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(editnewassessmentComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
