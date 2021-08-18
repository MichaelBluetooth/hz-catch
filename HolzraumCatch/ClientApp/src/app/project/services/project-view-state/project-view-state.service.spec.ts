import { TestBed } from '@angular/core/testing';

import { ProjectViewStateService } from './project-view-state.service';

describe('ProjectViewStateService', () => {
  let service: ProjectViewStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectViewStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
