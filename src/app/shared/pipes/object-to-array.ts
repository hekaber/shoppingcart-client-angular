/**
 * Created by hkb on 06.10.17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(obj: Object): Array<any> {
    return Object.keys(obj).map(
      (key) => {return [key, obj[key]]}
    );
  }

}
