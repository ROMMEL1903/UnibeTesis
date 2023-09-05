import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstuComponent } from './list-estu.component';

describe('ListEstuComponent', () => {
  let component: ListEstuComponent;
  let fixture: ComponentFixture<ListEstuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEstuComponent]
    });
    fixture = TestBed.createComponent(ListEstuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
