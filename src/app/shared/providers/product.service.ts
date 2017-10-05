import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestMethod, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';

import { IProduct } from '../models/product';
import { EndpointsProvider } from './endpoints';
import { AUTH_TOKEN } from "../constants";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ProductService {

  // It's our readonly observable to be aware of changes on our product collection
  readonly products$: Observable<Array<IProduct>>;
  // It's our BehaviorSubject, which will emit new version of our collection
  private _products$: BehaviorSubject<Array<IProduct>>;
  // It's our dataStore: our in-memory products collection
  private _dataStore: IProductServiceStore;

  constructor(
    private readonly _http: Http,
    private readonly _endpoints: EndpointsProvider
  ) {
    this._products$ = new BehaviorSubject([]);                           // Instanciate our BehaviorSubject w/ an empty collection
    this.products$ = this._products$.asObservable();                     // Store in our readonly variable our observable
    this._dataStore = { products: [] };                                    // Init empty datastore
  }

  /**
   * Make a get request to retrieve all products
   *
   * @return an observable of Iproduct[] form the HTTP request
   */
  getAll(): Observable<Array<IProduct>> {
    return this._request(RequestMethod.Get, this._endpoints.getProducts())
      .catch(this._handleError('No products'));
  }

  /**
   * Make a get request to retrieve the given id product
   *
   * @param id The product id
   * @return an observable of Iproduct form the HTTP request
   */
  get(id: string): Observable<IProduct> {

    return this._request(RequestMethod.Get, this._endpoints.getProduct(id))
      .catch(this._handleError('Product was not found'));
  }

  /**
   * Make an update request to retrieve the given id product
   *
   * @param id The product id
   * @return an observable of Iproduct form the HTTP request
   */
  update(product: IProduct): Observable<IProduct> {
    return this._request(RequestMethod.Put, this._endpoints.getProduct(product.id), product)
      .catch(this._handleError('Product was not found'));
  }

  save(product: IProduct): Observable<IProduct> {
    return null;
  }

  /**
   * Generic method to make request
   *
   * @param method The request method: POST, GET, PUT
   * @param url The request url
   * @param payload The payload (for put/post)
   */
  private _request<T>(method: RequestMethod, url: string, payload?: IProduct): Observable<T> {

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
      .do(product => this._syncDataStore(product))          // Sync server response with dataStore
  }

  /**
   * Sync given data with our dataStore in-memory collection
   * - Add the product if not found
   * - Update it else
   *
   * @param products The data to sync our dataStore (can be array or flat product)
   */
  private _syncDataStore(products: Array<IProduct> | IProduct) {
    // Force products to be an array
    if (!Array.isArray(products)) {
      products = [products];
    }
    // For each products, we'll check if it exists into the dataStore
    // --> if yes, we update the value
    // --> if no, we add the value
    products.forEach(product => {
      const productId = product.id;
      const currentIndex = this._dataStore.products.findIndex(storeProduct => storeProduct.id === productId);
      if (currentIndex < 0) { // When not found product into dataStore
        this._dataStore.products.push(product);
      } else {
        this._dataStore.products[currentIndex] = product;
      }
    });
    this._emitDataStore();
  }

  /**
   * Emit a new event on the BehaviorSubject based on our dataStore value
   */
  private _emitDataStore() {
    this._products$.next(Object.assign({}, this._dataStore).products);
  }

  private _handleError(errorMessage: string) {
    return (error: any): Observable<Error> => {
      console.error(errorMessage, error);
      return Observable.throw(new Error(error));
    };
  }
}

export interface IProductServiceStore {
  products: Array<IProduct>;
}
