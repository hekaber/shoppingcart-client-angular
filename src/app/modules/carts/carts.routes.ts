/**
 * Created by hkb on 05.10.17.
 */
import {Routes} from "@angular/router";
import {CartListComponent} from "./cart-list/cart-list.component";

export const CARTS_ROUTES: Routes = [
  { path:'', component: CartListComponent },
  { path: '**', redirectTo: '' }
];
