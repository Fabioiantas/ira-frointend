import { TestBed } from '@angular/core/testing';

import { AuditoriaDataService } from './auditoria-data.service';

describe('AuditoriaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaDataService = TestBed.get(AuditoriaDataService);
    expect(service).toBeTruthy();
  });
});
