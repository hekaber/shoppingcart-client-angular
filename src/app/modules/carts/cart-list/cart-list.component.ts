import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {JwtHelper} from "angular2-jwt";

import {ICart} from "../../../shared/models/cart";
import {CartService} from "../../../shared/providers/cart.service";
import {AUTH_TOKEN} from "../../../shared/constants";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {

  public cart$: Observable<ICart[]>;

  listFilter = '';
  errorMsg = '';

  private _cartSubscription: Subscription;

  constructor(
    private _cartService: CartService,
    private _jwtHelper: JwtHelper
  ) {
    let token = localStorage.getItem(AUTH_TOKEN);
    let decodedToken = this._jwtHelper.decodeToken(token);
    console.log(decodedToken.sub);
    this.cart$ = this._cartService.getByUserName(decodedToken.sub);
    this._cartSubscription = this.cart$.subscribe(
      (resp) => {console.log('OKKKKKK')},
      (err) => {
        let errJson = JSON.parse(err._body);
        this.errorMsg = errJson.error;
      }
    );
  }

  ngOnInit() {
    console.log('Cart list Init!!!!!!');

  }

  ngOnDestroy(){
    // TODO check if it does not alter some other behavior
    if(this._cartSubscription) this._cartSubscription.unsubscribe();
  }

}
