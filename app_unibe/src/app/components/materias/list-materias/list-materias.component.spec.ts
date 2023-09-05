import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMateriasComponent } from './list-materias.component';

describe('ListMateriasComponent', () => {
  let component: ListMateriasComponent;
  let fixture: ComponentFixture<ListMateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMateriasComponent]
    });
    fixture = TestBed.createComponent(ListMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
