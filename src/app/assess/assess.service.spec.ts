import { TestBed, inject } from '@angular/core/testing';

import { AssessService } from './assess.service';

describe('AssessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessService]
    });
  });

  it('should be created', inject([AssessService], (service: AssessService) => {
    expect(service).toBeTruthy();
  }));
});
