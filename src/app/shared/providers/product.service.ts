import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response, RequestMethod, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';

import { IProduct } from '../models/product';
import { EndpointsProvider } from './endpoints';
import { AUTH_TOKEN, AUTHORIZATION_HEADER } from "../constants";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ProductService {

  // It's our readonly observable to be aware of changes on our product collection
  readonly products$: Observable<Array<IProduct>>;
  // It's our BehaviorSubject, which will emit new version of our collection
  private _products$: BehaviorSubject<Array<IProduct>>;
  // It's our dataStore: our in-memory products collection
  private dataStore: IProductServiceStore;

  constructor(
    private readonly _http: Http,
    private readonly _endpoints: EndpointsProvider
  ) { }

  getAll(): Observable<Array<IProduct>> {
    // TODO make a request wrapper
    let token = localStorage.getItem(AUTH_TOKEN);
    let headers: Headers = new Headers({'Authorization': token});
    let options: RequestOptions = new RequestOptions({headers: headers});

    return this._http.get(this._endpoints.getProducts(), options)
      .do((res: Response) => console.log(`GET query to '${res.url}':'${res.status}'`))
      .map(res =>
        res.json()
      )
      .catch(this._handleError('No products'));
  }

  get(id: string): Observable<IProduct> {

    // TODO make a request wrapper
    let token = localStorage.getItem(AUTH_TOKEN);
    let headers: Headers = new Headers({'Authorization': token});
    let options: RequestOptions = new RequestOptions({headers: headers});

    return this._http.get(this._endpoints.getProduct(id), options)
      .do((res: Response) => console.log(`GET query to '${res.url}':'${res.status}'`))
      .map(res => res.json())
      .catch(this._handleError('Product was not found'));
  }

  update(id: string, product: IProduct): Observable<IProduct> {
    // TODO make a request wrapper
    let token = localStorage.getItem(AUTH_TOKEN);
    let headers: Headers = new Headers({'Authorization': token});
    let options: RequestOptions = new RequestOptions({headers: headers});


    return this._http.put(this._endpoints.getProduct(id), JSON.stringify(product), options)
      .do((res: Response) => console.log(`PUT query to '${res.url}':'${res.status}'`))
      .map(res => res.json())
      .catch(this._handleError('Product was not found'));
  }

  save(product: IProduct): Observable<IProduct> {
    return null;
  }

  private _request<T>(method: RequestMethod, url: string, payload?: IProduct): Observable<T> {
    const requestOption: RequestOptionsArgs = {             // We build the request options: method, payload
      method: method,
      body: payload ? payload : null
    }
    return this._http.request(url, requestOption)    // Call the Http service get method with the given URL
      .map(res => res.json())                               // Transform Http Response into a JSON Object
      // .do(product => this._syncDataStore(product))          // Sync server response with dataStore
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
