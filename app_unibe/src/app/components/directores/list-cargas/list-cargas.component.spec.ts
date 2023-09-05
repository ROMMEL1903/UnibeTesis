import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCargasComponent } from './list-cargas.component';

describe('ListCargasComponent', () => {
  let component: ListCargasComponent;
  let fixture: ComponentFixture<ListCargasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCargasComponent]
    });
    fixture = TestBed.createComponent(ListCargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
