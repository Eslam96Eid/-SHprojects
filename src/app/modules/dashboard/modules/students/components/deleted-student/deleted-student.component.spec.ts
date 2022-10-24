import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedStudentComponent } from './deleted-student.component';

describe('DeletedStudentComponent', () => {
  let component: DeletedStudentComponent;
  let fixture: ComponentFixture<DeletedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
