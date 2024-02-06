import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseReturnComponent } from './view-purchase-return.component';

describe('ViewPurchaseReturnComponent', () => {
  let component: ViewPurchaseReturnComponent;
  let fixture: ComponentFixture<ViewPurchaseReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPurchaseReturnComponent]
    });
    fixture = TestBed.createComponent(ViewPurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
