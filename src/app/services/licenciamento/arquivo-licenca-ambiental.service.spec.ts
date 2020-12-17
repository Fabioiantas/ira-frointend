import { TestBed } from '@angular/core/testing';

import { ArquivoLicencaAmbientalService } from './arquivo-licenca-ambiental.service';

describe('ArquivoLicencaAmbientalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArquivoLicencaAmbientalService = TestBed.get(ArquivoLicencaAmbientalService);
    expect(service).toBeTruthy();
  });
});
