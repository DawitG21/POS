import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettingsComponent } from './edit-settings.component';

describe('EditSettingsComponent', () => {
  let component: EditSettingsComponent;
  let fixture: ComponentFixture<EditSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSettingsComponent]
    });
    fixture = TestBed.createComponent(EditSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
