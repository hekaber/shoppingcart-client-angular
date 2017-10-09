import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {Observable} from 'rxjs/Observable';

import {IProduct} from '../../../shared/models/product';
import {ProductService} from '../../../shared/providers/product.service';
import {AUTH_TOKEN} from "../../../shared/constants";
import {PRODUCT_ACTION, ProductAction} from "../../../shared/models/product-action";
import {CartDetailComponent} from "../cart-detail/cart-detail.component";

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

  //forwardRef because the CartComponent is not yet defined
  //this is only used to handle the display of the remove button
  @ViewChild(forwardRef(() => CartDetailComponent))
  private cartDetailComponent: CartDetailComponent;

  public toggleText: string  = 'Hide Images';
  public product$: Observable<IProduct[]>;
  public listFilter: string = '';
  public userName: string = '';
  public productAction: ProductAction;

  private _displayImg: boolean = true;
  private mode: PRODUCT_LIST_MODE = PRODUCT_LIST_MODE.LIST;



  constructor(
    private _productService: ProductService,
    private _jwtHelper: JwtHelper
  ) {
    let token = localStorage.getItem(AUTH_TOKEN);
    let decodedToken = this._jwtHelper.decodeToken(token);
    this.userName = decodedToken.sub;
  }

  ngOnInit() {
    console.log('Product list Init!!!!!!');
    this.product$ = this._productService.getAll();
  }

  enableShoppingMode(){
    this.mode = PRODUCT_LIST_MODE.SHOP;
  }

  onShoppingModeEnded(){
    this.mode = PRODUCT_LIST_MODE.LIST;
    this.product$ = this._productService.getAll();
  }

  toggleImage(): void {
    this._displayImg = !this._displayImg;
    this.toggleText = this._displayImg ? 'Hide Images' : 'Display Images';
  }

  addProduct(product): void {
    this.productAction = new ProductAction(product.id, PRODUCT_ACTION.ADD);
  }

  removeProduct(product): void {
    this.productAction = new ProductAction(product.id, PRODUCT_ACTION.REMOVE);
  }

  isShop(){
    return this.mode === PRODUCT_LIST_MODE.SHOP;
  }

  isInCart(productId: string): boolean{
    return (this.cartDetailComponent) ? this.cartDetailComponent.isInCart(productId) : false;
  }

  getDisplayImg(){
    return this._displayImg;
  }
}
