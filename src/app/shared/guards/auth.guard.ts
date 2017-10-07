/**
 * Created by hkb on 07.10.17.
 */
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AuthenticationService} from "../providers/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  /**
   * It check if user is currently logged, redirect to /login page if not
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if(!this._authService.checkLogin()){
      this._router.navigateByUrl('/login')
    }
    return true;
  }
}
