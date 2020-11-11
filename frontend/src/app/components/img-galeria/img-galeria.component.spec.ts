import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgGaleriaComponent } from './img-galeria.component';

describe('ImgGaleriaComponent', () => {
  let component: ImgGaleriaComponent;
  let fixture: ComponentFixture<ImgGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgGaleriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
