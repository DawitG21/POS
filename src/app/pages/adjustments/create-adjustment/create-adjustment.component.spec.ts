import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdjustmentComponent } from './create-adjustment.component';

describe('CreateAdjustmentComponent', () => {
  let component: CreateAdjustmentComponent;
  let fixture: ComponentFixture<CreateAdjustmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdjustmentComponent]
    });
    fixture = TestBed.createComponent(CreateAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
