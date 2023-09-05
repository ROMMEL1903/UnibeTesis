import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatCargaComponent } from './creat-carga.component';

describe('CreatCargaComponent', () => {
  let component: CreatCargaComponent;
  let fixture: ComponentFixture<CreatCargaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatCargaComponent]
    });
    fixture = TestBed.createComponent(CreatCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
