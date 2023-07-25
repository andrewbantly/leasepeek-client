import { TestBed } from '@angular/core/testing';

import { RentRollService } from './rent-roll.service';

describe('RentRollService', () => {
  let service: RentRollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentRollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
