import { TestBed } from '@angular/core/testing';

import { CatDonacionesService } from './cat-donaciones.service';

describe('CatDonacionesService', () => {
  let service: CatDonacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatDonacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
