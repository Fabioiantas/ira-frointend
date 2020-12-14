import { TestBed } from '@angular/core/testing';

import { GeeDataServiceService } from './gee-data-service.service';

describe('GeeDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeeDataServiceService = TestBed.get(GeeDataServiceService);
    expect(service).toBeTruthy();
  });
});
