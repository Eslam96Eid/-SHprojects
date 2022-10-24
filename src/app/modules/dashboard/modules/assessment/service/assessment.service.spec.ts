import { TestBed } from '@angular/core/testing';

import { assessmentservice } from './assessment.service';

describe('AssessmentService', () => {
  let service: assessmentservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(assessmentservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
