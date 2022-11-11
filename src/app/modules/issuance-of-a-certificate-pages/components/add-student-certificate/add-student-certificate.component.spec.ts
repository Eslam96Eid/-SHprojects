import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentCertificateComponent } from './add-student-certificate.component';

describe('AddStudentCertificateComponent', () => {
  let component: AddStudentCertificateComponent;
  let fixture: ComponentFixture<AddStudentCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
