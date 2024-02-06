import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestaurantTableComponent } from './edit-restaurant-table.component';

describe('EditRestaurantTableComponent', () => {
  let component: EditRestaurantTableComponent;
  let fixture: ComponentFixture<EditRestaurantTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRestaurantTableComponent]
    });
    fixture = TestBed.createComponent(EditRestaurantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
