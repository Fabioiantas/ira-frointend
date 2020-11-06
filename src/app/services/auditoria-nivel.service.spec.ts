import { TestBed } from '@angular/core/testing';

import { AuditoriaNivelService } from './auditoria-nivel.service';

describe('AuditoriaNivelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaNivelService = TestBed.get(AuditoriaNivelService);
    expect(service).toBeTruthy();
  });
});
