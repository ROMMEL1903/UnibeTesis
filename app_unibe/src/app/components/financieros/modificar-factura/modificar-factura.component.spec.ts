import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFacturaComponent } from './modificar-factura.component';

describe('ModificarFacturaComponent', () => {
  let component: ModificarFacturaComponent;
  let fixture: ComponentFixture<ModificarFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarFacturaComponent]
    });
    fixture = TestBed.createComponent(ModificarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
