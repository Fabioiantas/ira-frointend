/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecursoServiceService } from './recurso-service.service';

describe('Service: RecursoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecursoServiceService]
    });
  });

  it('should ...', inject([RecursoServiceService], (service: RecursoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
