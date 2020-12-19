import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesDetalleComponent } from './actividades-detalle.component';

describe('ActividadesDetalleComponent', () => {
  let component: ActividadesDetalleComponent;
  let fixture: ComponentFixture<ActividadesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
