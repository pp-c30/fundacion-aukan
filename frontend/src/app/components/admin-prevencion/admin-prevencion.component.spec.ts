import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrevencionComponent } from './admin-prevencion.component';

describe('AdminPrevencionComponent', () => {
  let component: AdminPrevencionComponent;
  let fixture: ComponentFixture<AdminPrevencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPrevencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrevencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
