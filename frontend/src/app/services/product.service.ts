import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myApiUrl: string;
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'products/';

   }
 
   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
   }

   deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
   }

   saveProduct(product: Product): Observable<Product> { 
    return this.http.post<Product>(this.myAppUrl + this.myApiUrl, product);
   }
}
