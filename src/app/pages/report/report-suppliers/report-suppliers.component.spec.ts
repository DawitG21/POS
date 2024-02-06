import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSuppliersComponent } from './report-suppliers.component';

describe('ReportSuppliersComponent', () => {
  let component: ReportSuppliersComponent;
  let fixture: ComponentFixture<ReportSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportSuppliersComponent]
    });
    fixture = TestBed.createComponent(ReportSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
