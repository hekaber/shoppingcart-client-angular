import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from "@angular/http";
import { JwtHelper, AuthHttp } from 'angular2-jwt';

import { Observable, BehaviorSubject } from "rxjs";

import { EndpointsProvider } from './endpoints';

@Injectable()
export class AuthenticationService {

  private authUser = new BehaviorSubject(null);

  constructor(private _router: Router,
              private readonly _endpoints: EndpointsProvider,
              private readonly _http: Http,){}

  logout() {
    // localStorage.removeItem("user");
    // this._router.navigate(['Login']);
  }

  login(user){
    // let authenticatedUser = users.find(u => u.email === user.email);
    // if (authenticatedUser && authenticatedUser.password === user.password){
    //   localStorage.setItem("user", user.email);
    //   this._router.navigate(['Home']);
    //   return true;
    // }
    // return false;
  }

   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['Login']);
    }
  }

  signup(values: any): Observable<any> {
    console.log('Signing up');
    return this._http.post(this._endpoints.getSignup(), values)
      .map(response => {
        console.log(response);
        return response.text();
      })
      .catch(err => Observable.throw(this.handleErrors(err)));
  }

  private handleErrors(err: any): any {
    if (!err.ok && err.status == 409) {
      err.statusText = 'Username or email already exists';
    }
    return err;
  }
}
