import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFacturasComponent } from './list-facturas.component';

describe('ListFacturasComponent', () => {
  let component: ListFacturasComponent;
  let fixture: ComponentFixture<ListFacturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFacturasComponent]
    });
    fixture = TestBed.createComponent(ListFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
