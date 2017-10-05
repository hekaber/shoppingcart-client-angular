import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {IProduct} from "../models/product";
import {ProductService} from "../providers/product.service";

@Injectable()
export class ProductDetailResolve implements Resolve<IProduct> {

  constructor(private _productService: ProductService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct> {
    console.log(Number(route.paramMap.get('id')));
    return this._productService.get(route.paramMap.get('id'));
  }
}
