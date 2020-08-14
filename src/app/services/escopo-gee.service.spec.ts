import { TestBed } from '@angular/core/testing';

import { EscopoGeeService } from './escopo-gee.service';

describe('EscopoGeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscopoGeeService = TestBed.get(EscopoGeeService);
    expect(service).toBeTruthy();
  });
});
