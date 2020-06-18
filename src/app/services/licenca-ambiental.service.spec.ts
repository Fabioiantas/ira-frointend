import { TestBed } from '@angular/core/testing';

import { LicencaAmbientalService } from './licenca-ambiental.service';

describe('LicencaAmbientalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicencaAmbientalService = TestBed.get(LicencaAmbientalService);
    expect(service).toBeTruthy();
  });
});
