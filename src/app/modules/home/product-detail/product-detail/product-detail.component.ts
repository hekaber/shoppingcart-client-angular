import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {IProduct} from "../../../../shared/models/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  public form: FormGroup

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.form = _formBuilder.group({
      'id': '',
      'productName': ['', Validators.minLength(6)],
      'productCode': ['', Validators.minLength(6)],
      'releaseDate': '',
      'price': '',
      'description': '',
      'starRating': ['', Validators.compose([Validators.max(5), Validators.min(0)])],
      'imageUrl': ''
    });
  }

  ngOnInit() {
    this.product$ = this._route.data.map(data => data.product);
  }

  toggleMode() {
    this.mode = this.isEdit() ? PRODUCT_DETAIL_MODE.VIEW : PRODUCT_DETAIL_MODE.EDIT;
  }

  isEdit() {
    return this.mode === PRODUCT_DETAIL_MODE.EDIT;
  }

  submit() {
    console.log('Submit');
  }

}
