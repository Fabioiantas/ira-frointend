import { TestBed } from '@angular/core/testing';

import { MonitoramentoRecursoService } from './monitoramento-recurso.service';

describe('MonitoramentoRecursoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonitoramentoRecursoService = TestBed.get(MonitoramentoRecursoService);
    expect(service).toBeTruthy();
  });
});
