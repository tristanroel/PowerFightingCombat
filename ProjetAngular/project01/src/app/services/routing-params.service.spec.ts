import { TestBed } from '@angular/core/testing';

import { RoutingParamsService } from './routing-params.service';

describe('RoutingParamsService', () => {
  let service: RoutingParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
