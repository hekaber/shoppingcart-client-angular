import {Component, OnInit} from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import { Observable } from 'rxjs/Observable';

import { IProduct } from '../../../shared/models/product';
import { ProductService } from '../../../shared/providers/product.service';
import {CartService} from "../../../shared/providers/cart.service";
import {AUTH_TOKEN, CART_STATUS_PENDING, CURR_CART_ID} from "../../../shared/constants";
import {Cart, ICart} from "../../../shared/models/cart";
import {AlertService} from "../../../shared/providers/alert.service";

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
  public listFilter: string = '';
  public userName: string = '';

  private _displayImg: boolean = true;
  private _newCart: Cart;
  private _cartId: string;
  private mode: PRODUCT_LIST_MODE = PRODUCT_LIST_MODE.LIST;



  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _jwtHelper: JwtHelper,
    private _alertService: AlertService
  ) {
    let token = localStorage.getItem(AUTH_TOKEN);
    let decodedToken = this._jwtHelper.decodeToken(token);
    this.userName = decodedToken.sub;
    this._newCart = new Cart(CART_STATUS_PENDING, this.userName);
  }

  ngOnInit() {
    console.log('Product list Init!!!!!!');
    this.product$ = this._productService.getAll();
    console.log('Checking for cart');
    this._cartId = localStorage.getItem(CURR_CART_ID);
    console.log(this._cartId);
    if(this._cartId) this.cart$ = this._cartService.get(this._cartId)
      .catch(
        (error) => {
          this._resetValues();
          this.mode = PRODUCT_LIST_MODE.LIST;
          return Observable.throw(new Error(error));
        });

  }

  enableShoppingMode(){
    this.mode = PRODUCT_LIST_MODE.SHOP;
    if(!this._cartId){
      this.cart$ = this._cartService.save(this._newCart)
        .do(cart => {
          this._cartId = cart.id;
          localStorage.setItem(CURR_CART_ID, cart.id);
          this._newCart = Cart.fromICart(cart);
          console.log(this._newCart);
        }).catch(
          (error) => {
            this._alertService.error("Error " + error.message);
            return Observable.throw(new Error(error));
          }
        );
    }
  }

  disableShoppingMode(cart: ICart){
    this.mode = PRODUCT_LIST_MODE.LIST;
    if(cart.status === "pending"){
      this._cartService.remove(cart.id).subscribe(
        (resp) => {
          this._alertService.info("Pending shopping cart " + cart.id + " deleted.");
          this._resetValues();
        },
        (err) => {
          console.log(err);
          this._alertService.error("Could not remove cart " + cart.id);
        });
    }
  }

  toggleImage(): void {
    this._displayImg = !this._displayImg;
    this.toggleText = this._displayImg ? 'Hide Images' : 'Display Images';
  }

  addProduct(productId: string): void {
    console.log(productId);
    if (this._cartId){
      this.cart$ = this._cartService.addProductToCart(this._cartId, productId);
    }
  }

  removeProduct(productId: string): void {
    if (this._cartId) {
      this.cart$ = this._cartService.removeProductFromCart(this._cartId, productId);
    }
  }

  makeOrder(cart: ICart){
    console.log(cart.products);
    if(Object.keys(cart.products).length === 0){
      this._alertService.warn("You must have products in the cart to make an order.");
    }
    else {
      this.cart$ = this._cartService.order(cart)
        .do((cart) =>{
          console.log(cart);
          this._alertService.success("Cart " + cart.id + " ordered!!!");
          this._resetValues();
          this.mode = PRODUCT_LIST_MODE.LIST;
        });
    }
  }

  isShop(){
    return this.mode === PRODUCT_LIST_MODE.SHOP;
  }

  getDisplayImg(){
    return this._displayImg;
  }

  private _resetValues(){
    localStorage.removeItem(CURR_CART_ID);
    this.cart$ = null;
    this._cartId = null;
  }
}
