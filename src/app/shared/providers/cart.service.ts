import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Http, RequestMethod, RequestOptionsArgs, Response, Headers} from "@angular/http";


import {ICart} from "../models/cart";
import {EndpointsProvider} from "./endpoints";
import {AUTH_TOKEN} from "../constants";

@Injectable()
export class CartService {
  // Same comments as in product service
  readonly cart$: Observable<Array<ICart>>;
  private _carts$: BehaviorSubject<Array<ICart>>;
  private _dataStore: ICartServiceStore;

  constructor(
    private readonly _http: Http,
    private readonly _endpoints: EndpointsProvider
  ) {
    this._carts$ = new BehaviorSubject([]);
    this.cart$ = this._carts$.asObservable();
    this._dataStore = { carts: [] };
  }

  /**
   * Make a get request to retrieve all products
   *
   * @return an observable of ICart[] form the HTTP request
   */
  getAll(): Observable<Array<ICart>> {
    return this._request(RequestMethod.Get, this._endpoints.getCarts());
  }

  get(cartId: string): Observable<ICart> {
    return this._request(RequestMethod.Get, this._endpoints.getCart(cartId));
  }

  save(cart: ICart): Observable<ICart> {
    return this._request(RequestMethod.Post, this._endpoints.getCarts(), cart);
  }

  update(cart: ICart): Observable<ICart>{
    return this._request(RequestMethod.Put, this._endpoints.getCart(cart.id), cart);
  }

  delete(cartId: string): Observable<any>{
    // return this
    return this._request(RequestMethod.Delete, this._endpoints.getCart(cartId));
  }

  order(cart: ICart): Observable<ICart> {
    cart.status = "ordered";
    return this._request(RequestMethod.Post, this._endpoints.getCartOrder(cart.id),
      cart);
  }

  addProductToCart(cartId: string, productId: string): Observable<ICart>{
    return this._request(RequestMethod.Post, this._endpoints.getProductToCart(cartId, productId));
  }

  removeProductFromCart(cartId: string, productId: string): Observable<ICart>{
    return this._request(RequestMethod.Delete, this._endpoints.getProductToCart(cartId, productId));
  }
  getByUserName(userName: string): Observable<Array<ICart>> {
    return this._request(RequestMethod.Get, this._endpoints.getCartsByUserName(userName));
  }
  /**
   * Generic method to make request
   *
   * @param method The request method: POST, GET, PUT
   * @param url The request url
   * @param payload The payload (for put/post)
   */
  private _request<T>(method: RequestMethod, url: string, payload?: any): Observable<T> {

    let token = localStorage.getItem(AUTH_TOKEN);
    let headers: Headers = new Headers({'Authorization': token});

    const requestOption: RequestOptionsArgs = {
      method: method,
      headers: headers,
      body: payload ? payload : null
    };
    return this._http.request(url, requestOption)
      .do((res: Response) => console.log(`${method.toString()}' query to '${res.url}':'${res.status}'`))
      .map(res => res.json())                        // Transform Http Response into a JSON Object
      .do(cart => { if(cart) this._syncDataStore(cart)});          // Sync server response with dataStore
  }

  /**
   * Sync given data with our dataStore in-memory collection
   * - Add the product if not found
   * - Update it else
   *
   * @param carts The data to sync our dataStore (can be array or flat product)
   */
  private _syncDataStore(carts: Array<ICart> | ICart) {
    // Force products to be an array
    if (!Array.isArray(carts)) {
      carts = [carts];
    }
    carts.forEach(cart => {
      const cartId = cart.id;
      const currentIndex = this._dataStore.carts.findIndex(storeCart => storeCart.id === cartId);
      if (currentIndex < 0) { // When not found product into dataStore
        this._dataStore.carts.push(cart);
      } else {
        this._dataStore.carts[currentIndex] = cart;
      }
    });
    this._emitDataStore();
  }

  /**
   * Emit a new event on the BehaviorSubject based on our dataStore value
   */
  private _emitDataStore() {
    this._carts$.next(Object.assign({}, this._dataStore).carts);
  }

}

export interface ICartServiceStore {
  carts: Array<ICart>;
}
