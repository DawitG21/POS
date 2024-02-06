import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransfersComponent } from './edit-transfers.component';

describe('EditTransfersComponent', () => {
  let component: EditTransfersComponent;
  let fixture: ComponentFixture<EditTransfersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransfersComponent]
    });
    fixture = TestBed.createComponent(EditTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
