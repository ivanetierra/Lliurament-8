import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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


export class AddEditProductComponent implements OnInit {
  
  id: number;
  function: string = 'Add';
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    stock: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router, 
    private _productService : ProductService,
    private aRouter : ActivatedRoute,
  ) {
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.function = 'Edit';
      this._productService.getProductById(this.id).subscribe(
        data => {
          this.form.setValue({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
          });
        })
    }
  }


  
  
  goBack() {
  this.router.navigate(['/']);
  }

  addProduct() {
    const product: Product = this.form.value;
    this._productService.saveProduct(product).subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }
  
}
