import { Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import {HOME_ROUTES} from "./modules/home/home.routes";
import {CARTS_ROUTES} from "./modules/carts/carts.routes";

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home', children: HOME_ROUTES },
  { path: 'carts', children: CARTS_ROUTES },
  { path: '', redirectTo:'/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login' }
];
