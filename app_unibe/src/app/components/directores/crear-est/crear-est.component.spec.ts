import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstComponent } from './crear-est.component';

describe('CrearEstComponent', () => {
  let component: CrearEstComponent;
  let fixture: ComponentFixture<CrearEstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEstComponent]
    });
    fixture = TestBed.createComponent(CrearEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
