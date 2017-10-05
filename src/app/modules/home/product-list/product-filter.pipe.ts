import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../../../shared/models/product";

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: IProduct[], filter: string): IProduct[] {
    filter = filter.toLowerCase();
    if (Array.isArray(products)){
      return products.filter(
        product => product.productName.toLowerCase().startsWith(filter)
      );
    }
  }

}
