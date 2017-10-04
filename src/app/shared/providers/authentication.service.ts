import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from "@angular/http";
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable, BehaviorSubject } from "rxjs";

import { EndpointsProvider } from './endpoints';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

  private authUser = new BehaviorSubject(null);
  public user$: Observable<User> = this.authUser.asObservable();
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _router: Router,
              private readonly _endpoints: EndpointsProvider,
              private readonly _http: Http,
              private readonly jwtHelper: JwtHelper,
              protected storage: AsyncLocalStorage){}

  logout() {
    // localStorage.removeItem("user");
    // this._router.navigate(['Login']);
  }

  login(username: string, password: string): Observable<any>{
    return this._http.post(this._endpoints.getLogin(), JSON.stringify({userName: username, password: password}), {headers: this.headers})
      .map((response: Response) => {
        this.handleResponse(response);
        return response;
      })
      .catch(err => Observable.throw(this.handleErrors(err))
      )
  }

   checkCredentials(){

  }

  signup(values: any): Observable<any> {
    console.log('Signing up');
    return this._http.post(this._endpoints.getSignup(), values)
      .map(response => {
        return response.text();
      })
      .catch(err => Observable.throw(this.handleErrors(err)));
  }

  private handleResponse(response: Response) {
    let authToken = response.headers.get('authorization');
    console.log(authToken);
    return this.storage.setItem('auth_token', authToken).subscribe(
      () => {
        console.log('stored!!!!!');
        console.log(this.authUser.getValue());
        this.authUser.next(this.jwtHelper.decodeToken(authToken));
        console.log(this.authUser.getValue());
      },
      () => {
        Observable.throw(this.handleErrors('Not stored'));
      }
    );
      // .map(() => {
      //   console.log('stored!!!!!');
      //   this.authUser.next(this.jwtHelper.decodeToken(authToken));
      //   return authToken;
      // })
      // .catch(err => Observable.throw(this.handleErrors(err)));
  }

  private handleErrors(err: any): any {
     console.log('Error' + err);
    if (!err.ok && err.status == 409) {
      err.statusText = 'Username or email already exists';
    }
    return err;
  }
}
