import { TestBed } from '@angular/core/testing';

import { PropriedadeService } from './propriedade.service';

describe('PropriedadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropriedadeService = TestBed.get(PropriedadeService);
    expect(service).toBeTruthy();
  });
});
