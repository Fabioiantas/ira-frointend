import { TestBed } from '@angular/core/testing';

import { FonteEmissoraService } from './fonte-emissora.service';

describe('FonteEmissoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FonteEmissoraService = TestBed.get(FonteEmissoraService);
    expect(service).toBeTruthy();
  });
});
