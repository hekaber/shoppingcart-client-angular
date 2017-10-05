/**
 * Created by hkb on 05.10.17.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {ICart} from "../../../shared/models/cart";

@Pipe({
  name: 'cartFilter'
})
export class CartFilterPipe implements PipeTransform {

  transform(carts: ICart[], filter: string): ICart[] {
    filter = filter.toLowerCase();
    if (Array.isArray(carts)){
      return carts.filter(
        cart => cart.userName.toLowerCase().startsWith(filter)
      );
    }
  }

}
