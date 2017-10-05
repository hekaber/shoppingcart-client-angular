/**
 * Created by hkb on 05.10.17.
 */
import {Routes} from "@angular/router";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailResolve} from "../../shared/resolves/product-resolve";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

export const HOME_ROUTES: Routes = [
  { path:'', component: ProductListComponent },
  {
    path: 'product/:id',
      component: ProductDetailComponent,
    resolve: {product: ProductDetailResolve }
  },
  { path: '**', redirectTo: '' }
]
