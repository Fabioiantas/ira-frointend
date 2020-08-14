import { TestBed } from '@angular/core/testing';

import { FonteEmissaoService } from './fonte-emissao.service';

describe('FonteEmissaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FonteEmissaoService = TestBed.get(FonteEmissaoService);
    expect(service).toBeTruthy();
  });
});
