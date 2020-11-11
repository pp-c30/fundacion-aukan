import { TestBed } from '@angular/core/testing';

import { CatGaleriaService } from './cat-galeria.service';

describe('CatGaleriaService', () => {
  let service: CatGaleriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatGaleriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
