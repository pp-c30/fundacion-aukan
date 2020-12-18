import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePrevencionComponent } from './detalle-prevencion.component';

describe('DetallePrevencionComponent', () => {
  let component: DetallePrevencionComponent;
  let fixture: ComponentFixture<DetallePrevencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePrevencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePrevencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
