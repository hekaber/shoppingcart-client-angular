import { Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import {HOME_ROUTES} from "./modules/home/home.routes";
import {CARTS_ROUTES} from "./modules/carts/carts.routes";
import {WelcomeComponent} from "./modules/welcome/welcome.component";
import {AuthGuard} from "./shared/guards/auth.guard";

export const APP_ROUTES: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home', children: HOME_ROUTES , canActivate:[AuthGuard]},
  { path: 'carts', children: CARTS_ROUTES, canActivate:[AuthGuard] },
  { path: '', redirectTo:'/welcome', pathMatch: 'full'},
  { path: '**', redirectTo: '/home' }
];
