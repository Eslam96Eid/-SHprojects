import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForIssuanceOfACertificateComponent } from './ask-for-issuance-of-a-certificate.component';

describe('AskForIssuanceOfACertificateComponent', () => {
  let component: AskForIssuanceOfACertificateComponent;
  let fixture: ComponentFixture<AskForIssuanceOfACertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskForIssuanceOfACertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskForIssuanceOfACertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
