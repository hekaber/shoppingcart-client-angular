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
  productQuantities: Map<string, number>,
  lastModified: Date;
  orderDate: Date;
  totalPrice: number;
}

export class Cart implements ICart {
  public id: string;
  public status: string;
  public userName: string;
  public products: Map<string, IProduct>;
  public productQuantities: Map<string, number>;
  public lastModified: Date;
  public orderDate: Date;
  public totalPrice: number;

  constructor(
    status: string, userName: string,
    id?: string,
    products?: Map<string, IProduct>,
    productQuantities?: Map<string, number>,
    lastModified?: Date,
    orderDate?: Date,
    totalPrice?: number
  ){
    this.status = status;
    this.userName = userName;
    id == null ? this.id = '' : this.id = id;
    products == null ? this.products = new Map<string, IProduct>() : this.products = products;
    productQuantities == null ? this.productQuantities = new Map<string, number>() : this.productQuantities = productQuantities;
    lastModified == null ? this.lastModified = new Date() : this.lastModified = lastModified;
    orderDate == null ? this.orderDate = new Date() : this.orderDate = orderDate;
    totalPrice == null ? this.totalPrice = 0 : this.totalPrice = totalPrice;
  }

  public static fromICart(cart: ICart){
    return new Cart(
      cart.status,
      cart.userName,
      cart.id,
      cart.products,
      cart.productQuantities,
      cart.lastModified,
      cart.orderDate,
      cart.totalPrice
    );
  }

  addProductItem(product: IProduct){
    console.log(product);
    console.log(this.products);
    if (!(product.id in this.products)){
      this.products[product.id] = product;
      console.log(this.products);
    }
    this.addProductQuantity(product)

  }

  addProductQuantity(product: IProduct){
    if(product.id in this.productQuantities){
      let newQuant = this.productQuantities[product.id];
      newQuant++;
      this.productQuantities[product.id] = newQuant;
    }
    else {
      this.productQuantities[product.id] = 1;
    }
  }

}
