import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEmployeesComponent } from './school-employees.component';

describe('SchoolEmployeesComponent', () => {
  let component: SchoolEmployeesComponent;
  let fixture: ComponentFixture<SchoolEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
