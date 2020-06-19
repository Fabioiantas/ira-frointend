import { TestBed } from '@angular/core/testing';

import { TipoAtividadeService } from './tipo-atividade.service';

describe('TipoAtividadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoAtividadeService = TestBed.get(TipoAtividadeService);
    expect(service).toBeTruthy();
  });
});
