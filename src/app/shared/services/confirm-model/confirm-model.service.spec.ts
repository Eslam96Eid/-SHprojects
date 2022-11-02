import { TestBed } from '@angular/core/testing';

import { ConfirmModelService } from './confirm-model.service';

describe('ConfirmModelService', () => {
  let service: ConfirmModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
