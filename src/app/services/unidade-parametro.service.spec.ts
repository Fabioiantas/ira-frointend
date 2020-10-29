import { TestBed } from '@angular/core/testing';

import { UnidadeParametroService } from './unidade-parametro.service';

describe('UnidadeParametroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadeParametroService = TestBed.get(UnidadeParametroService);
    expect(service).toBeTruthy();
  });
});
