import { TestBed } from '@angular/core/testing';

import { VerificacionService } from './verificacion.service';

describe('VerificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerificacionService = TestBed.get(VerificacionService);
    expect(service).toBeTruthy();
  });
});
