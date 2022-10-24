import { TestBed } from '@angular/core/testing';

import { RouteListenrService } from './route-listenr.service';

describe('RouteListenrService', () => {
  let service: RouteListenrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteListenrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
