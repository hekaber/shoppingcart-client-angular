import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {IProduct} from "../../models/product";
import {Cart, ICart} from "../../models/cart";
import {CartService} from "../../providers/cart.service";
import {PRODUCT_ACTION, ProductAction} from "../../models/product-action";
import {ProductService} from "../../providers/product.service";
import {CART_STATUS_PENDING, CURR_CART_ID} from "../../constants";
import {PRODUCT_LIST_MODE} from "../../../modules/home/product-list/product-list.component";
import {AlertService} from "../../providers/alert.service";

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})

export class CartDetailComponent implements OnInit, OnChanges {
  public cart$: Observable<ICart>;

  // @Input() products: Observable<IProduct>;
  @Input() productAction: any;
  @Input() userName: string;
  changeLog: string[] = [];

  private _cartId: string;
  private _newCart: Cart;

  constructor(
    private _cartService: CartService,
    private _productService: ProductService,
    private _alertService: AlertService
  ) {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('Checking for cart');
    this._initCart();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    let log: string[] = [];
    console.log(changes);
    for (let propName in changes) {
      let changedProp = changes[propName];

      switch (propName){
        case "productAction":
          if(changedProp.currentValue) this._handleProductActionChange(changedProp.currentValue);
          break;
        default:
          break;
      }

      // changedProp.currentValue.subscribe(
      //   (products) => { console.log(products); },
      //   (err) => { console.log(err); }
      // );

      // let to = JSON.stringify(changedProp.currentValue);
      // if (changedProp.isFirstChange()) {
      //   log.push(`Initial value of ${propName} set to ${to}`);
      // } else {
      //   let from = JSON.stringify(changedProp.previousValue);
      //   log.push(`${propName} changed from ${from} to ${to}`);
      // }
    }
    this.changeLog.push(log.join(', '));
  }

  addProduct(productId: string){
    this._productService.get(productId).subscribe(
      (product) => {
        console.log(product);
        if(product.stock > 0){
          if(this._cartId){
            this.cart$ = this._cartService.addProductToCart(this._cartId, product.id).do(
              (cart) => {
                this._newCart = Cart.fromICart(cart);
              });
          }
        }
        else {
          this._alertService.warn("Product " + product.id +" stock out.");
        }
      },
      (error) => {
        console.log(error);
      });
  }

  removeProduct(productId: string){
    if (this._cartId) {
      this.cart$ = this._cartService.removeProductFromCart(this._cartId, productId).do(
        (cart) => {
          this._newCart = Cart.fromICart(cart);
        });
      // this.product$ = this._productService.getAll();
    }
  }

  private _initCart(){
    this._cartId = localStorage.getItem(CURR_CART_ID);
    this._newCart = new Cart(CART_STATUS_PENDING, this.userName);

    console.log(this._cartId);
    if(this._cartId){
      this.cart$ = this._cartService.get(this._cartId).do(
        (cart) => {
          this._newCart = Cart.fromICart(cart);
        })
        .catch(
          (error) => {
            this._resetValues();
            // TODO: send some event to the parent component
            return Observable.throw(new Error(error));
          });
    }
    else {
      this._newCart = new Cart(CART_STATUS_PENDING, this.userName);
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

  makeOrder(cart: ICart){

  }

  disableShoppingMode(cart: ICart){

  }

  private _handleProductActionChange(productAction: ProductAction){
    switch (productAction.action){
      case PRODUCT_ACTION.ADD:
        this.addProduct(productAction.productId);
        break;
      case PRODUCT_ACTION.REMOVE:
        this.removeProduct(productAction.productId);
    }
  }

  private _resetValues(){
    // TODO: should use cookies instead?
    localStorage.removeItem(CURR_CART_ID);
    this.cart$ = null;
    this._cartId = null;
    this._newCart = null;
  }
}
