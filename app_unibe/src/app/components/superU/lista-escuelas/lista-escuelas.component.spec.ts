import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEscuelasComponent } from './lista-escuelas.component';

describe('ListaEscuelasComponent', () => {
  let component: ListaEscuelasComponent;
  let fixture: ComponentFixture<ListaEscuelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEscuelasComponent]
    });
    fixture = TestBed.createComponent(ListaEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
