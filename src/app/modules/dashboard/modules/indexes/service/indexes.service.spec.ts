import { TestBed } from '@angular/core/testing';

import { IndexesService } from './indexes.service';

describe('IndexesService', () => {
  let service: IndexesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
