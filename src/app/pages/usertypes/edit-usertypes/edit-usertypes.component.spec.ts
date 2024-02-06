import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsertypesComponent } from './edit-usertypes.component';

describe('EditUsertypesComponent', () => {
  let component: EditUsertypesComponent;
  let fixture: ComponentFixture<EditUsertypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUsertypesComponent]
    });
    fixture = TestBed.createComponent(EditUsertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
