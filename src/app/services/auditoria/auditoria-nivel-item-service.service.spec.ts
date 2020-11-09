import { TestBed } from '@angular/core/testing';

import { AuditoriaNivelItemServiceService } from './auditoria-nivel-item-service.service';

describe('AuditoriaNivelItemServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaNivelItemServiceService = TestBed.get(AuditoriaNivelItemServiceService);
    expect(service).toBeTruthy();
  });
});
