import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../shared/providers/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: 'menu';
  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    console.log('logout');
  }
}
