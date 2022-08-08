import { TestBed } from '@angular/core/testing';

import { CarpetaService } from './carpeta.service';

describe('CarpetaService', () => {
  let service: CarpetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarpetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
