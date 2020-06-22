import { TestBed } from '@angular/core/testing';

import { LicencaEntidadeService } from './licenca-entidade.service';

describe('LicencaEntidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicencaEntidadeService = TestBed.get(LicencaEntidadeService);
    expect(service).toBeTruthy();
  });
});
