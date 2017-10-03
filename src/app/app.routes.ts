import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { HomeComponent } from './modules/home/home.component';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo:'/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login' }
];
