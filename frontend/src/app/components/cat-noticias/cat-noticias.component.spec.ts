import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatNoticiasComponent } from './cat-noticias.component';

describe('CatNoticiasComponent', () => {
  let component: CatNoticiasComponent;
  let fixture: ComponentFixture<CatNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
