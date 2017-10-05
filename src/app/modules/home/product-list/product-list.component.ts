import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/models/product';
import { ProductService } from '../../../shared/providers/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public toggleText: string  = 'Hide Images';
  public product$: Observable<IProduct[]>;
  private _displayImg: boolean = true;

  listFilter = '';

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    console.log('Product list Init!!!!!!');
    this.product$ = this._productService.getAll();
  }


  toggleImage(): void {
    this._displayImg = !this._displayImg;
    this.toggleText = this._displayImg ? 'Hide Images' : 'Display Images';
  }

  getDisplayImg(){
    return this._displayImg;
  }
}
