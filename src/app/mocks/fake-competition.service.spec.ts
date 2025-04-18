import { TestBed } from '@angular/core/testing';

import { FakeCompetitionService } from './fake-competition.service';

describe('FakeCompetitionService', () => {
  let service: FakeCompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeCompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
