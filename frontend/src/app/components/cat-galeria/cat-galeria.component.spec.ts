import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatGaleriaComponent } from './cat-galeria.component';

describe('CatGaleriaComponent', () => {
  let component: CatGaleriaComponent;
  let fixture: ComponentFixture<CatGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatGaleriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
