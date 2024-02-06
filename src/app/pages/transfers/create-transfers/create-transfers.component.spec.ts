import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransfersComponent } from './create-transfers.component';

describe('CreateTransfersComponent', () => {
  let component: CreateTransfersComponent;
  let fixture: ComponentFixture<CreateTransfersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTransfersComponent]
    });
    fixture = TestBed.createComponent(CreateTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
