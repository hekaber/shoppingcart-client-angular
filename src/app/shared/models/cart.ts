/**
 * Created by hkb on 05.10.17.
 */
import {IProduct} from "./product";
/**
 * Created by hkb on 04.10.17.
 */
export interface ICart {
  id: string;
  status: string;
  userName: string;
  products: Map<string, IProduct>;
  lastModified: Date;
  orderDate: Date;
  totalPrice: number;
}
