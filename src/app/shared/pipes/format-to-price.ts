/**
 * Created by hkb on 08.10.17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatToPrice'
})
export class FormatToPricePipe implements PipeTransform {

  transform(price: number): number {
    return price/100;
  }

}
