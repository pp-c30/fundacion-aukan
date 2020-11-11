import { TestBed } from '@angular/core/testing';

import { ImgActividadesService } from './img-actividades.service';

describe('ImgActividadesService', () => {
  let service: ImgActividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgActividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
