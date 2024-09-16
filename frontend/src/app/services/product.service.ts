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
    this.myApiUrl = 'products/';
    this.myAppUrl = 'http://localhost:3000/';

   }
 
   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
   }
}
