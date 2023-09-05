import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEComponent } from './home-e.component';

describe('HomeEComponent', () => {
  let component: HomeEComponent;
  let fixture: ComponentFixture<HomeEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEComponent]
    });
    fixture = TestBed.createComponent(HomeEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
