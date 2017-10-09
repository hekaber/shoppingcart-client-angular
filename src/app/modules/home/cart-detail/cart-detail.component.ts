import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {Cart, ICart} from "../../../shared/models/cart";
import {CartService} from "../../../shared/providers/cart.service";
import {PRODUCT_ACTION, ProductAction} from "../../../shared/models/product-action";
import {ProductService} from "../../../shared/providers/product.service";
import {CART_STATUS_PENDING, CURR_CART_ID} from "../../../shared/constants";
import {AlertService} from "../../../shared/providers/alert.service";

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit, OnChanges {
  public cart$: Observable<ICart>;

  @Input() productAction: any;
  @Input() userName: string;
  @Output() onShoppingModeEnded = new EventEmitter<void>();

  private _cartId: string;
  private _newCart: Cart;

  constructor(
    private _cartService: CartService,
    private _productService: ProductService,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    console.log('Checking for cart');
    this._initCart();
  }

  //watches the changes on productAction property
  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    for (let propName in changes) {
      let changedProp = changes[propName];

      switch (propName){
        case "productAction":
          if(changedProp.currentValue) this._handleProductActionChange(changedProp.currentValue);
          break;
        default:
          break;
      }
    }
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
        this._alertService.error("Add product error " + error.message);
      });
  }

  removeProduct(productId: string){
    if (this._cartId) {
      this.cart$ = this._cartService.removeProductFromCart(this._cartId, productId).do(
        (cart) => {
          this._newCart = Cart.fromICart(cart);
        },
        (error) => {
          this._alertService.error("Remove product error " + error.message);
        });
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
            this._alertService.error("Could not retrieve the cart with id " + this._cartId);
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
            this._alertService.error("Init cart error " + error.message);
            return Observable.throw(new Error(error));
          }
        );
    }
  }

  orderCart(cart: ICart){
    console.log(cart.products);
    if(Object.keys(cart.products).length === 0){
      this._alertService.warn("You must have products in the cart to make an order.");
    }
    else {
      this._cartService.order(cart).subscribe(
        (cart) => {
          console.log(cart);
          this._alertService.success("Cart " + cart.id + " ordered!!!");
          this._resetValues();
          this.onShoppingModeEnded.emit();
        },
        (err) => {
          console.log(err);
          this._alertService.error("Could not order cart " + cart.id);
        });
    }
  }

  cancelCart(cart: ICart){
    if(cart.status === "pending"){
      this._cartService.remove(cart.id).subscribe(
        () => {
          this._alertService.info("Pending shopping cart " + cart.id + " deleted.");
          this._resetValues();
          this.onShoppingModeEnded.emit();
        },
        (err) => {
          console.log(err);
          this._alertService.error("Could not remove cart " + cart.id);
        });
    }
  }

  isInCart(productId: string): boolean{
    return (this._newCart) ? (productId in this._newCart.products) : false;
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
