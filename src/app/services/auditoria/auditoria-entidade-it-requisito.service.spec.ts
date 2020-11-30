import { TestBed } from '@angular/core/testing';

import { AuditoriaEntidadeItRequisitoService } from './auditoria-entidade-it-requisito.service';

describe('AuditoriaEntidadeItRequisitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaEntidadeItRequisitoService = TestBed.get(AuditoriaEntidadeItRequisitoService);
    expect(service).toBeTruthy();
  });
});
