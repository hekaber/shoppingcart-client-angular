import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';

import { IProduct } from '../models/product';
import { EndpointsProvider } from './endpoints';

@Injectable()
export class ProductService {

  constructor(
    private readonly _http: Http,
    private readonly _endpoints: EndpointsProvider
  ) { }

  getProducts(): Observable<Array<IProduct>> {
    return this._http.get(this._endpoints.getProducts())
      .do((res: Response) => console.log(`GET query to '${res.url}':'${res.status}'`))
      .map(res => res.json())
      .catch(this._handleError('No products'));
  }

  get(id: string): Observable<IProduct> {
    return this._http.get(this._endpoints.getProduct(id))
      .do((res: Response) => console.log(`GET query to '${res.url}':'${res.status}'`))
      .map(res => res.json())
      .catch(this._handleError('Product was not found'));
  }

  save(product: IProduct): Observable<IProduct> {
    return null;
  }

  private _handleError(errorMessage: string) {
    return (error: any): Observable<Error> => {
      console.error(errorMessage, error);
      return Observable.throw(new Error(error));
    };
  }
}
