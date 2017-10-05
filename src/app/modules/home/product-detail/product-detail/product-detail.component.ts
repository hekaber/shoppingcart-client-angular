import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {ProductService} from "../../../../shared/providers/product.service";
import {IProduct} from "../../../../shared/models/product";

export enum PRODUCT_DETAIL_MODE {
  VIEW,
  EDIT
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product$: Observable<IProduct>;
  private mode: PRODUCT_DETAIL_MODE = PRODUCT_DETAIL_MODE.VIEW;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) { }

  ngOnInit() {
    this.product$ = this._route.data.map(data => data.product);
  }

  toggleMode() {
    this.mode = this.isEdit() ? PRODUCT_DETAIL_MODE.VIEW : PRODUCT_DETAIL_MODE.EDIT;
  }

  isEdit() {
    return this.mode === PRODUCT_DETAIL_MODE.EDIT;
  }
}
