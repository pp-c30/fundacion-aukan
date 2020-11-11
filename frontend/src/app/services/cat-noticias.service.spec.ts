import { TestBed } from '@angular/core/testing';

import { CatNoticiasService } from './cat-noticias.service';

describe('CatNoticiasService', () => {
  let service: CatNoticiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatNoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
