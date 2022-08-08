import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcarpetaComponent } from './crearcarpeta.component';

describe('CrearcarpetaComponent', () => {
  let component: CrearcarpetaComponent;
  let fixture: ComponentFixture<CrearcarpetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearcarpetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearcarpetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
