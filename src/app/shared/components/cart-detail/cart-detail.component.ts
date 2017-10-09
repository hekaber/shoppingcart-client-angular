import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {IProduct} from "../../models/product";
import {ICart} from "../../models/cart";
import {CartService} from "../../providers/cart.service";

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})

export class CartDetailComponent implements OnInit {
  public cart$: Observable<ICart>;

  @Input() product: IProduct;
  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit() {
  }

}
