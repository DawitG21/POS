import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseComponent } from './edit-purchase.component';

describe('EditPurchaseComponent', () => {
  let component: EditPurchaseComponent;
  let fixture: ComponentFixture<EditPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPurchaseComponent]
    });
    fixture = TestBed.createComponent(EditPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
