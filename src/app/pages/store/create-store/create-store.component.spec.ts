import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreComponent } from './create-store.component';

describe('CreateStoreComponent', () => {
  let component: CreateStoreComponent;
  let fixture: ComponentFixture<CreateStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStoreComponent]
    });
    fixture = TestBed.createComponent(CreateStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
