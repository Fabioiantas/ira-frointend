import { TestBed } from '@angular/core/testing';

import { AuditoriaRequisitoService } from './auditoria-requisito.service';

describe('AuditoriaRequisitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaRequisitoService = TestBed.get(AuditoriaRequisitoService);
    expect(service).toBeTruthy();
  });
});
