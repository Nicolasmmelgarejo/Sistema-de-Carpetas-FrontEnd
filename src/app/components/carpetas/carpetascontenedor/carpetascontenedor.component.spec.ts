import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetascontenedorComponent } from './carpetascontenedor.component';

describe('CarpetascontenedorComponent', () => {
  let component: CarpetascontenedorComponent;
  let fixture: ComponentFixture<CarpetascontenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpetascontenedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpetascontenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
