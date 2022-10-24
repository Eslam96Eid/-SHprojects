import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDivisionsComponent } from './school-divisions.component';

describe('SchoolDivisionsComponent', () => {
  let component: SchoolDivisionsComponent;
  let fixture: ComponentFixture<SchoolDivisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolDivisionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
