import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaxComponent } from './create-tax.component';

describe('CreateTaxComponent', () => {
  let component: CreateTaxComponent;
  let fixture: ComponentFixture<CreateTaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaxComponent]
    });
    fixture = TestBed.createComponent(CreateTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
