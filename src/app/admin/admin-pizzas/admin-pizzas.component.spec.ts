import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPizzasComponent } from './admin-pizzas.component';

describe('AdminPizzasComponent', () => {
  let component: AdminPizzasComponent;
  let fixture: ComponentFixture<AdminPizzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPizzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
