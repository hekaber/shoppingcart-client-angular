import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../shared/providers/authentication.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User('','', '', '', '');
  public errorMsg = '';

  constructor(
      private _service:AuthenticationService) {}

  login() {
      if(!this._service.login(this.user)){
          this.errorMsg = 'Failed to login';
      }
  }

  ngOnInit() {
  }

}
