import { TestBed } from '@angular/core/testing';

import { TipoMonitoramentoService } from './tipo-monitoramento.service';

describe('TipoMonitoramentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoMonitoramentoService = TestBed.get(TipoMonitoramentoService);
    expect(service).toBeTruthy();
  });
});
