import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/providers/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping Cart';

  constructor(private _authService: AuthenticationService){
    this._authService.user$.subscribe(
      (token) => {
        if(token){
          console.log(token);
        }
        else {
          console.log('NO Token');
        }
      }
    );
  }
}
