import { TestBed } from '@angular/core/testing';

import { AuditoriaNivelItRequisitoService } from './auditoria-nivel-it-requisito.service';

describe('AuditoriaNivelItRequisitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaNivelItRequisitoService = TestBed.get(AuditoriaNivelItRequisitoService);
    expect(service).toBeTruthy();
  });
});
