import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdComponent } from './lista-ad.component';

describe('ListaAdComponent', () => {
  let component: ListaAdComponent;
  let fixture: ComponentFixture<ListaAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAdComponent]
    });
    fixture = TestBed.createComponent(ListaAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
