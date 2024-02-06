import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypesComponent } from './usertypes.component';

describe('UsertypesComponent', () => {
  let component: UsertypesComponent;
  let fixture: ComponentFixture<UsertypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsertypesComponent]
    });
    fixture = TestBed.createComponent(UsertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
