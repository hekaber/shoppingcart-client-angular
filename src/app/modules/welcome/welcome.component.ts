import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../shared/providers/authentication.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    if(this._authenticationService.checkLogin()){
      this._router.navigateByUrl('/home');
    }
  }

  login(){
    this._router.navigateByUrl('/login');
  }
}
