import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent {
  constructor(private router: Router, private _productService : ProductService) {}

  goBack() {
    this.router.navigate(['/']);
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    stock: new FormControl(null, Validators.required),
  });

  addProduct() {
    const product: Product = this.form.value;
    this._productService.saveProduct(product).subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }
  
}
