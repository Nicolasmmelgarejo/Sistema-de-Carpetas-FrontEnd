import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarArchivoComponent } from './editar-archivo.component';

describe('EditarArchivoComponent', () => {
  let component: EditarArchivoComponent;
  let fixture: ComponentFixture<EditarArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
