import { Component, OnInit } from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import { Observable } from 'rxjs/Observable';

import { IProduct } from '../../../shared/models/product';
import { ProductService } from '../../../shared/providers/product.service';
import {CartService} from "../../../shared/providers/cart.service";
import {AUTH_TOKEN, CART_STATUS_PENDING} from "../../../shared/constants";
import {Cart, ICart} from "../../../shared/models/cart";

export enum PRODUCT_LIST_MODE {
  LIST,
  SHOP
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public toggleText: string  = 'Hide Images';
  public product$: Observable<IProduct[]>;
  public cart$: Observable<ICart>;
  private _displayImg: boolean = true;
  private _shopClickCount: number = 0;
  private _userName: string = '';
  private _newCart: Cart;
  private mode: PRODUCT_LIST_MODE = PRODUCT_LIST_MODE.LIST;

  listFilter = '';
  hasShoppingCart: boolean = false;

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _jwtHelper: JwtHelper
  ) {
    let token = localStorage.getItem(AUTH_TOKEN);
    let decodedToken = this._jwtHelper.decodeToken(token);
    console.log(decodedToken.sub);
    this._newCart = new Cart(CART_STATUS_PENDING, decodedToken.sub);
  }

  ngOnInit() {
    console.log('Product list Init!!!!!!');
    this.product$ = this._productService.getAll();
  }

  toggleMode() {
    this.mode = this.isShop() ? PRODUCT_LIST_MODE.LIST : PRODUCT_LIST_MODE.SHOP;
    if(this._shopClickCount < 1){
      this.cart$ = this._cartService.save(this._newCart)
        .do(cart => {
          this._newCart = Cart.fromICart(cart);
          console.log(this._newCart);
        });

    }
    this._shopClickCount++;
    console.log(this._shopClickCount);
  }

  toggleImage(): void {
    this._displayImg = !this._displayImg;
    this.toggleText = this._displayImg ? 'Hide Images' : 'Display Images';
  }

  addProduct(product: IProduct): void {
    if (this._newCart){
      this._newCart.addProductItem(product);
      this._cartService.update(this._newCart).subscribe(
        (cart) => { console.log(cart)},
        (err) => { console.log(err)}
      );
      console.log(this._newCart);
    }
    console.log()
  }

  removeProduct(productId: string): void {
    console.log(productId)
  }

  isShop(){
    return this.mode === PRODUCT_LIST_MODE.SHOP;
  }

  shoppingCartCreated(): boolean {
    return this.hasShoppingCart;
  }

  getDisplayImg(){
    return this._displayImg;
  }
}
