import { TestBed } from '@angular/core/testing';

import { AuditoriaEntidadeService } from './auditoria-entidade.service';

describe('AuditoriaEntidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaEntidadeService = TestBed.get(AuditoriaEntidadeService);
    expect(service).toBeTruthy();
  });
});
