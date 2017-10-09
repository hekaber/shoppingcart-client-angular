/**
 * Created by hkb on 09.10.17.
 */
export enum PRODUCT_ACTION {
  ADD,
  REMOVE
}

export class ProductAction {
  productId: string;
  action: PRODUCT_ACTION;

  constructor(productId: string, action: PRODUCT_ACTION){
    this.productId = productId;
    this.action = action;
  }
}
