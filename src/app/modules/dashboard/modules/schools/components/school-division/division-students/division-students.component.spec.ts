import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionStudentsComponent } from './division-students.component';

describe('DivisionStudentsComponent', () => {
  let component: DivisionStudentsComponent;
  let fixture: ComponentFixture<DivisionStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
