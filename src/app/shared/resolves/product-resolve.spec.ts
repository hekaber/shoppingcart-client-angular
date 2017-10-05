import { TestBed, inject } from '@angular/core/testing';

import { ProductDetailResolve } from './product-resolve';

describe('ProductResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailResolve]
    });
  });

  it('should be created', inject([ProductDetailResolve], (service: ProductDetailResolve) => {
    expect(service).toBeTruthy();
  }));
});
