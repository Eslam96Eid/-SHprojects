import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsAndDegreesComponent } from './subjects-and-degrees.component';

describe('SubjectsAndDegreesComponent', () => {
  let component: SubjectsAndDegreesComponent;
  let fixture: ComponentFixture<SubjectsAndDegreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsAndDegreesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsAndDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
