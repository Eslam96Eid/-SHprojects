import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStudentComponent } from './card-student.component';

describe('CardStudentComponent', () => {
  let component: CardStudentComponent;
  let fixture: ComponentFixture<CardStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
