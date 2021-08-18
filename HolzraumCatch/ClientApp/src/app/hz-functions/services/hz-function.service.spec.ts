import { TestBed } from '@angular/core/testing';

import { HzFunctionService } from './hz-function.service';

describe('HzFunctionService', () => {
  let service: HzFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HzFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
