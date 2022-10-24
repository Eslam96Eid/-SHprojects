import { ComponentFixture, TestBed } from '@angular/core/testing';

import { assessmentslistComponent } from './assessments-list.component';

describe('ViewAssessmentsListComponent', () => {
  let component: assessmentslistComponent ;
  let fixture: ComponentFixture<assessmentslistComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [assessmentslistComponent  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(assessmentslistComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
