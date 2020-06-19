import { TestBed } from '@angular/core/testing';

import { TipoLicencaService } from './tipo-licenca.service';

describe('TipoLicencaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoLicencaService = TestBed.get(TipoLicencaService);
    expect(service).toBeTruthy();
  });
});
