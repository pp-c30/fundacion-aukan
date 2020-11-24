import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTestimoniosComponent } from './detalle-testimonios.component';

describe('DetalleTestimoniosComponent', () => {
  let component: DetalleTestimoniosComponent;
  let fixture: ComponentFixture<DetalleTestimoniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTestimoniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
