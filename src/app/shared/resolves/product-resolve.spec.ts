import { TestBed, inject } from '@angular/core/testing';

import { ProductResolveService } from './product-resolve';

describe('ProductResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductResolveService]
    });
  });

  it('should be created', inject([ProductResolveService], (service: ProductResolveService) => {
    expect(service).toBeTruthy();
  }));
});
