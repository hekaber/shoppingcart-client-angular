import { Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import {ProductListComponent} from "./modules/home/product-list/product-list.component";
import {ProductDetailComponent} from "./modules/home/product-detail/product-detail.component";
import {ProductDetailResolve} from "./shared/resolves/product-resolve";
import {HOME_ROUTES} from "./modules/home/home.routes";

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home', children: HOME_ROUTES },
  { path: '', redirectTo:'/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login' }
];
