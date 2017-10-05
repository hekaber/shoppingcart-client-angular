/**
 * Created by hkb on 05.10.17.
 */
import {Routes} from "@angular/router";
import {CartDetailComponent} from "./cart-detail/cart-detail.component";
// import {ProductDetailResolve} from "../../shared/resolves/product-resolve";
import {CartListComponent} from "./cart-list/cart-list.component";

export const CARTS_ROUTES: Routes = [
  { path:'', component: CartListComponent },
  {
    path: 'cart/:id',
    component: CartDetailComponent,
    // resolve: {product: ProductDetailResolve }
  },
  { path: '**', redirectTo: '' }
];
