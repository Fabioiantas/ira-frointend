import { TestBed } from '@angular/core/testing';

import { EntidadeService } from './entidade.service';

describe('EntidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntidadeService = TestBed.get(EntidadeService);
    expect(service).toBeTruthy();
  });
});
