import { TestBed } from '@angular/core/testing';

import { AuditoriaItemService } from './auditoria-item.service';

describe('AuditoriaItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditoriaItemService = TestBed.get(AuditoriaItemService);
    expect(service).toBeTruthy();
  });
});
