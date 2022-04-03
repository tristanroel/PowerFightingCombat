import { TestBed } from '@angular/core/testing';

import { CapacitiesService } from './capacities.service';

describe('CapacitiesService', () => {
  let service: CapacitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
