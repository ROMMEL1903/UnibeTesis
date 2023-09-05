import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdComponent } from './crear-ad.component';

describe('CrearAdComponent', () => {
  let component: CrearAdComponent;
  let fixture: ComponentFixture<CrearAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearAdComponent]
    });
    fixture = TestBed.createComponent(CrearAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
