import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxComponent } from './edit-tax.component';

describe('EditTaxComponent', () => {
  let component: EditTaxComponent;
  let fixture: ComponentFixture<EditTaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaxComponent]
    });
    fixture = TestBed.createComponent(EditTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
