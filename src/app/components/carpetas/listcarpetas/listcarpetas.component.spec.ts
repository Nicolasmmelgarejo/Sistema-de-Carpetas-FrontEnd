import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcarpetasComponent } from './listcarpetas.component';

describe('ListcarpetasComponent', () => {
  let component: ListcarpetasComponent;
  let fixture: ComponentFixture<ListcarpetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcarpetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcarpetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
