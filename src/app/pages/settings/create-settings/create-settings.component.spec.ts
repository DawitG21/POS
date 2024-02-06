import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSettingsComponent } from './create-settings.component';

describe('CreateSettingsComponent', () => {
  let component: CreateSettingsComponent;
  let fixture: ComponentFixture<CreateSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSettingsComponent]
    });
    fixture = TestBed.createComponent(CreateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
