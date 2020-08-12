import { TestBed } from '@angular/core/testing';

import { GeeService } from './gee.service';

describe('GeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeeService = TestBed.get(GeeService);
    expect(service).toBeTruthy();
  });
});
