import { TestBed } from '@angular/core/testing';

import { ModelDataDefinitionResolver } from './model-data-definition.resolver';

describe('ModelDataDefinitionResolver', () => {
  let resolver: ModelDataDefinitionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ModelDataDefinitionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
