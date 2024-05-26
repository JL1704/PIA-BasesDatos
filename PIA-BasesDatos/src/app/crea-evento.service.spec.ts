import { TestBed } from '@angular/core/testing';

import { CreaEventoService } from './crea-evento.service';

describe('CreaEventoService', () => {
  let service: CreaEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreaEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
