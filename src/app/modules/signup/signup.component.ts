import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private _service: AuthenticationService,
    private _router: Router
  ) { }

  signup(){
    this._service
      .signup(this.user)
      .subscribe(
        (resp) => {
          console.log(resp);
          this._router.navigateByUrl('/home');
        },
        (err) => {
          console.log(err);
          // TODO: test with err.JSON
          let errBodyObj = JSON.parse(err._body);
          this.errorMsg = errBodyObj.message;
        }
      );
  }

  ngOnInit() {
  }

}
