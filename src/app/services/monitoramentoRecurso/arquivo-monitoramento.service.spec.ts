import { TestBed } from '@angular/core/testing';

import { ArquivoMonitoramentoService } from './arquivo-monitoramento.service';

describe('ArquivoMonitoramentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArquivoMonitoramentoService = TestBed.get(ArquivoMonitoramentoService);
    expect(service).toBeTruthy();
  });
});
