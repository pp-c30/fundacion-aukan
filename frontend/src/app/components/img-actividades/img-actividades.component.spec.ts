import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgActividadesComponent } from './img-actividades.component';

describe('ImgActividadesComponent', () => {
  let component: ImgActividadesComponent;
  let fixture: ComponentFixture<ImgActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
