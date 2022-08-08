import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistausuariosComponent } from './vistausuarios.component';

describe('VistausuariosComponent', () => {
  let component: VistausuariosComponent;
  let fixture: ComponentFixture<VistausuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistausuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
