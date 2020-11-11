import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDonacionesComponent } from './cat-donaciones.component';

describe('CatDonacionesComponent', () => {
  let component: CatDonacionesComponent;
  let fixture: ComponentFixture<CatDonacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatDonacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
