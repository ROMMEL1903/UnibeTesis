import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasCargaComponent } from './materias-carga.component';

describe('MateriasCargaComponent', () => {
  let component: MateriasCargaComponent;
  let fixture: ComponentFixture<MateriasCargaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriasCargaComponent]
    });
    fixture = TestBed.createComponent(MateriasCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
