import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantTableComponent } from './create-restaurant-table.component';

describe('CreateRestaurantTableComponent', () => {
  let component: CreateRestaurantTableComponent;
  let fixture: ComponentFixture<CreateRestaurantTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRestaurantTableComponent]
    });
    fixture = TestBed.createComponent(CreateRestaurantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
