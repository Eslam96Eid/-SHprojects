import { TestBed } from '@angular/core/testing';

import { IssuanceCertificaeService } from './issuance-certificae.service';

describe('IssuanceCertificaeService', () => {
  let service: IssuanceCertificaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuanceCertificaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
