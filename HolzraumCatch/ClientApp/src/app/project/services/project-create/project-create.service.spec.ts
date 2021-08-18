import { TestBed } from '@angular/core/testing';

import { ProjectCreateService } from './project-create.service';

describe('ProjectCreateService', () => {
  let service: ProjectCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
