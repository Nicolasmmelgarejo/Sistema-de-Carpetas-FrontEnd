import { TestBed } from '@angular/core/testing';

import { ArchivoService } from './archivo.service';

describe('ArchivoService', () => {
  let service: ArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
