import { TestBed } from '@angular/core/testing';

import { HzFunctionListResolver } from './hz-function-list.resolver';

describe('HzFunctionListResolver', () => {
  let resolver: HzFunctionListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HzFunctionListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
