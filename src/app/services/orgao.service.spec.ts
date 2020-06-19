import { TestBed } from '@angular/core/testing';

import { OrgaoService } from './orgao.service';

describe('OrgaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgaoService = TestBed.get(OrgaoService);
    expect(service).toBeTruthy();
  });
});
