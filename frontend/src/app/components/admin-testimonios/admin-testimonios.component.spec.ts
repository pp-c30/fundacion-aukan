import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestimoniosComponent } from './admin-testimonios.component';

describe('AdminTestimoniosComponent', () => {
  let component: AdminTestimoniosComponent;
  let fixture: ComponentFixture<AdminTestimoniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTestimoniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
