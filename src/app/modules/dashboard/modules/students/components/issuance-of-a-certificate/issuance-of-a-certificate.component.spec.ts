import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuanceOfACertificateComponent } from './issuance-of-a-certificate.component';

describe('IssuanceOfACertificateComponent', () => {
  let component: IssuanceOfACertificateComponent;
  let fixture: ComponentFixture<IssuanceOfACertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuanceOfACertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuanceOfACertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
