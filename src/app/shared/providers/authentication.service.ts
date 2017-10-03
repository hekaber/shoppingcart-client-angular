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
              private readonly endpoints: EndpointsProvider,
              private readonly http: Http,){}

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
    return this.http.post(this.endpoints.getSignup(), values)
      .map(response => {
        console.log(response.text());
        return response.text();
      });
  }

  private handleErrors(err: any): any {
    if (!err.ok && err.statusText == '') {
      err.statusText = 'Erreur de connexion avec le serveur';
    }
    return err;
  }
}
