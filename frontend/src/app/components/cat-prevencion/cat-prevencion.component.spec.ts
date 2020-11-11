import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPrevencionComponent } from './cat-prevencion.component';

describe('CatPrevencionComponent', () => {
  let component: CatPrevencionComponent;
  let fixture: ComponentFixture<CatPrevencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatPrevencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatPrevencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
