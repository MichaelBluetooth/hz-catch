import { TestBed } from '@angular/core/testing';

import { ModelDataListResolver } from './model-data-list.resolver';

describe('ModelDataListResolver', () => {
  let resolver: ModelDataListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ModelDataListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
