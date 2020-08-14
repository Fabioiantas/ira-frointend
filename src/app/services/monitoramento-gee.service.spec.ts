import { TestBed } from '@angular/core/testing';

import { MonitoramentoGeeService } from './monitoramento-gee.service';

describe('MonitoramentoGeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonitoramentoGeeService = TestBed.get(MonitoramentoGeeService);
    expect(service).toBeTruthy();
  });
});
