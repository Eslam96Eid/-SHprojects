import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewSubjectComponent } from './edit-new-subject.component';

describe('EditNewSubjectComponent', () => {
  let component: EditNewSubjectComponent;
  let fixture: ComponentFixture<EditNewSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
