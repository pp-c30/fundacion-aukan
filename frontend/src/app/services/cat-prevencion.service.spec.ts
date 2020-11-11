import { TestBed } from '@angular/core/testing';

import { CatPrevencionService } from './cat-prevencion.service';

describe('CatPrevencionService', () => {
  let service: CatPrevencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatPrevencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
