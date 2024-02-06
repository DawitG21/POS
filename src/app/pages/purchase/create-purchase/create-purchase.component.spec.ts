import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseComponent } from './create-purchase.component';

describe('CreatePurchaseComponent', () => {
  let component: CreatePurchaseComponent;
  let fixture: ComponentFixture<CreatePurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePurchaseComponent]
    });
    fixture = TestBed.createComponent(CreatePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
