import { TestBed } from '@angular/core/testing';

import { ProcessoAnaliseService } from './processo-analise.service';

describe('ProcessoAnaliseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessoAnaliseService = TestBed.get(ProcessoAnaliseService);
    expect(service).toBeTruthy();
  });
});
