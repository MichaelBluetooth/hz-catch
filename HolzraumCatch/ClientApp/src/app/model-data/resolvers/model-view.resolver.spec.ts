import { TestBed } from '@angular/core/testing';

import { ModelViewResolver } from './model-view.resolver';

describe('ModelViewResolver', () => {
  let resolver: ModelViewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ModelViewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
