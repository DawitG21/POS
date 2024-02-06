import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsertypesComponent } from './create-usertypes.component';

describe('CreateUsertypesComponent', () => {
  let component: CreateUsertypesComponent;
  let fixture: ComponentFixture<CreateUsertypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUsertypesComponent]
    });
    fixture = TestBed.createComponent(CreateUsertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
