import { TestBed } from '@angular/core/testing';

import { AuditoriaEvidenciaRequisitoService } from './auditoria-evidencia-requisito.service';

describe('AuditoriaEvidenciaRequisitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaEvidenciaRequisitoService = TestBed.get(AuditoriaEvidenciaRequisitoService);
    expect(service).toBeTruthy();
  });
});
