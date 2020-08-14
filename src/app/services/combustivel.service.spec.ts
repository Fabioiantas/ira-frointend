import { TestBed } from '@angular/core/testing';

import { CombustivelService } from './combustivel.service';

describe('CombustivelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombustivelService = TestBed.get(CombustivelService);
    expect(service).toBeTruthy();
  });
});
