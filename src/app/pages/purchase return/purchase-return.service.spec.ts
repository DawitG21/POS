import { TestBed } from '@angular/core/testing';

import { PurchaseReturnService } from './purchase-return.service';

describe('PurchaseReturnService', () => {
  let service: PurchaseReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
