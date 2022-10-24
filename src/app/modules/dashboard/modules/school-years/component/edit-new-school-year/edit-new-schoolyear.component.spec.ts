import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewSchoolyearComponent } from './edit-new-schoolyear.component';

describe('EditNewSchoolyearComponent', () => {
  let component: EditNewSchoolyearComponent;
  let fixture: ComponentFixture<EditNewSchoolyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewSchoolyearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewSchoolyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
