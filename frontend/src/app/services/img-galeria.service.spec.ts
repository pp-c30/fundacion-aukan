import { TestBed } from '@angular/core/testing';

import { ImgGaleriaService } from './img-galeria.service';

describe('ImgGaleriaService', () => {
  let service: ImgGaleriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgGaleriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
