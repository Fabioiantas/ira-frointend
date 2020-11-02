import { TestBed } from '@angular/core/testing';

import { TipoMonitoramentoParamService } from './tipo-monitoramento-param.service';

describe('TipoMonitoramentoParamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoMonitoramentoParamService = TestBed.get(TipoMonitoramentoParamService);
    expect(service).toBeTruthy();
  });
});
