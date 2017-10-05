import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AsyncLocalStorageModule } from 'angular-async-local-storage'

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { SignupComponent } from './modules/signup/signup.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthenticationService } from './shared/providers/authentication.service';
import { EndpointsProvider } from './shared/providers/endpoints';
// import { Http, RequestOptions } from '@angular/http';
// import { JwtHelper, AuthConfig, AuthHttp } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import { ProductListComponent } from './modules/home/product-list/product-list.component';
import {ProductService} from "./shared/providers/product.service";
import { ProductFilterPipe } from './modules/home/product-list/product-filter.pipe';
import { ProductDetailComponent } from './modules/home/product-detail/product-detail/product-detail.component';
import {ProductDetailResolve} from "./shared/resolves/product-resolve";

// Auth Factory
// TODO: add storage for token
// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   const authConfig = new AuthConfig({
//     noJwtError: true,
//     globalHeaders: [{'Accept': 'application/json'}],
//     // tokenGetter: (() => storage.get('jwt')),
//   });
//   return new AuthHttp(authConfig, http, options);
// }

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProductListComponent,
    ProductFilterPipe,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AsyncLocalStorageModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    AuthenticationService,
    EndpointsProvider,
    JwtHelper,
    ProductService,
    ProductDetailResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
