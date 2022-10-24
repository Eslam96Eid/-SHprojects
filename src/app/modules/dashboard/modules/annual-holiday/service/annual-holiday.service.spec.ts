import { TestBed } from '@angular/core/testing';

import { AnnualHolidayService } from './annual-holiday.service';

describe('AnnualHolidayService', () => {
  let service: AnnualHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualHolidayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
