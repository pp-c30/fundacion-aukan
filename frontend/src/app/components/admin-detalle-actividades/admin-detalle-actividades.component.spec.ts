import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetalleActividadesComponent } from './admin-detalle-actividades.component';

describe('AdminDetalleActividadesComponent', () => {
  let component: AdminDetalleActividadesComponent;
  let fixture: ComponentFixture<AdminDetalleActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetalleActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetalleActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
