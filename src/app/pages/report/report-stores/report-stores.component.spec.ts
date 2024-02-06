import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStoresComponent } from './report-stores.component';

describe('ReportStoresComponent', () => {
  let component: ReportStoresComponent;
  let fixture: ComponentFixture<ReportStoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportStoresComponent]
    });
    fixture = TestBed.createComponent(ReportStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
