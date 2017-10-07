/**
 * Created by hkb on 04.10.17.
 */
export interface IProduct {
  id: string;
  productName: string;
  productCode: string;
  releaseDate: Date;
  lastModified: Date;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  stock: number;
}
