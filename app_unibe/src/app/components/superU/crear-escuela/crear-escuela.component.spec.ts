import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEscuelaComponent } from './crear-escuela.component';

describe('CrearEscuelaComponent', () => {
  let component: CrearEscuelaComponent;
  let fixture: ComponentFixture<CrearEscuelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEscuelaComponent]
    });
    fixture = TestBed.createComponent(CrearEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
