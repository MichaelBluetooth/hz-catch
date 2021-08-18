import { TestBed } from '@angular/core/testing';

import { ImportResolver } from './import.resolver';

describe('ImportResolver', () => {
  let resolver: ImportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ImportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
