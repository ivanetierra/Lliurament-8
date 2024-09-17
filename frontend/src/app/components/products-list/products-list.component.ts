import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  providers: [ProductService],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  productsList:  Product[] = [];

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      
      (data) => {
        this.productsList = data;
      });
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(
      () => {
        this.getProducts();
      }
    );
  }

}
