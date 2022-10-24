import { TestBed } from '@angular/core/testing';

import { RegisterChildService } from './register-child.service';

describe('RegisterChildService', () => {
  let service: RegisterChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
