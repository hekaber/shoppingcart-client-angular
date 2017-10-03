import { Component, OnInit } from '@angular/core';

import { User } from '../../shared/models/user';
import { AuthenticationService } from '../../shared/providers/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = new User('', '', '', '', '');
  public errorMsg = '';

  constructor(private _service:AuthenticationService) { }

  signup(){
    this._service
      .signup(this.user)
      .subscribe(
        (resp) => console.log(resp),
        (err) => this.errorMsg = err.statusText
      );
  }

  ngOnInit() {
  }

}
