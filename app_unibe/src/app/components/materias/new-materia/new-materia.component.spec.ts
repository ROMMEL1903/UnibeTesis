import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMateriaComponent } from './new-materia.component';

describe('NewMateriaComponent', () => {
  let component: NewMateriaComponent;
  let fixture: ComponentFixture<NewMateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMateriaComponent]
    });
    fixture = TestBed.createComponent(NewMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
