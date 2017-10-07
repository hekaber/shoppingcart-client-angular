import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {IProduct} from "../../../shared/models/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/providers/product.service";

export enum PRODUCT_DETAIL_MODE {
  VIEW,
  EDIT
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  public product$: Observable<IProduct>;
  private mode: PRODUCT_DETAIL_MODE = PRODUCT_DETAIL_MODE.VIEW;
  public form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _productService: ProductService
  ) {

    /*
     * Here we combine two streams:
     * - route data (resolve)
     * - productService data
     * And we return the current product id item
     */
    this.product$ = Observable.combineLatest(
      this._route.data.map(data => data.product),
      this._productService.products$,
      (productFromResolve, products) => {
        // Here we got the in-memory collection (products) and the productFromResolve
        return products.find(product => product.id === productFromResolve.id)
      })
      .do(product => {
        // Init form with fresh data
        this.initForm(product)
      });

    this.form = _formBuilder.group({
      'id': '',
      'productName': ['', Validators.minLength(6)],
      'productCode': ['', Validators.minLength(6)],
      'releaseDate': '',
      'lastModified': '',
      'price': '',
      'description': '',
      'starRating': ['', Validators.compose([Validators.max(5), Validators.min(0)])],
      'imageUrl': '',
      'stock': ''
    });
  }

  toggleMode() {
    this.mode = this.isEdit() ? PRODUCT_DETAIL_MODE.VIEW : PRODUCT_DETAIL_MODE.EDIT;
  }

  isEdit() {
    return this.mode === PRODUCT_DETAIL_MODE.EDIT;
  }

  initForm(product: IProduct) {
    this.form.setValue(product)
  }

  submit() {
    console.log('Submit');
    this._productService
      .update(this.form.value)
      .subscribe(product => {this.toggleMode()});

  }

}
