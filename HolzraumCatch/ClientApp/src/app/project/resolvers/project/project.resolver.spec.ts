import { TestBed } from '@angular/core/testing';

import { ProjectResolver } from './project.resolver';

describe('ProjectService', () => {
  let service: ProjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
