import { TestBed } from '@angular/core/testing';

import { ClassificacaoRequisitoService } from './classificacao-requisito.service';

describe('ClassificacaoRequisitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassificacaoRequisitoService = TestBed.get(ClassificacaoRequisitoService);
    expect(service).toBeTruthy();
  });
});
