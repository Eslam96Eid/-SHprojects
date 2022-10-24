import { TestBed } from '@angular/core/testing';

import { SchoolYearsService } from './school-years.service';

describe('SchoolYearsService', () => {
  let service: SchoolYearsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolYearsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
