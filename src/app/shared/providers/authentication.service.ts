import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from "@angular/http";
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";

import { EndpointsProvider } from './endpoints';
import { User } from '../models/user';
import { AUTH_TOKEN } from '../constants';

@Injectable()
export class AuthenticationService {

  private authUser = new BehaviorSubject(null);
  public user$: Observable<User> = this.authUser.asObservable();
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private readonly _endpoints: EndpointsProvider,
              private readonly _http: Http,
              private readonly _jwtHelper: JwtHelper){}

  logout() {
    localStorage.removeItem(AUTH_TOKEN);
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

  signup(values: any): Observable<any> {
    console.log('Signing up');
    return this._http.post(this._endpoints.getSignup(), values)
      .map(response => {
        return response.text();
      })
      .catch(err => Observable.throw(this.handleErrors(err)));
  }

  checkLogin(): boolean{
    let token = localStorage.getItem(AUTH_TOKEN);
    if(token && !this._jwtHelper.isTokenExpired(token)){
      return true;
    }
    else {
      localStorage.removeItem(AUTH_TOKEN)
      this.authUser.next(null);
      return false;
    }
  }

  //Stores the auth token in the local storage
  private handleResponse(response: Response){
    let authToken = response.headers.get('authorization');
    localStorage.setItem(AUTH_TOKEN, authToken);
    let decodedToken = this._jwtHelper.decodeToken(authToken);
    console.log(decodedToken);
    //put the decoded token in the Behaviorsubject
    this.authUser.next(decodedToken);
  }

  private handleErrors(err: any): any {
     console.log('Error' + err);
    if (!err.ok && err.status == 409) {
      err.statusText = 'Username or email already exists';
    }
    return err;
  }
}
