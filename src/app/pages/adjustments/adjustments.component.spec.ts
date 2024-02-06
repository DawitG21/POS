import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentsComponent } from './adjustments.component';

describe('AdjustmentsComponent', () => {
  let component: AdjustmentsComponent;
  let fixture: ComponentFixture<AdjustmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustmentsComponent]
    });
    fixture = TestBed.createComponent(AdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
