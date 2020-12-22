import { TestBed } from '@angular/core/testing';

import { AuditoriaEvidenciaService } from './auditoria-evidencia.service';

describe('AuditoriaEvidenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaEvidenciaService = TestBed.get(AuditoriaEvidenciaService);
    expect(service).toBeTruthy();
  });
});
