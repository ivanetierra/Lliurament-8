import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
    {path: '', component: ProductsListComponent},
    {path: 'add', component: AddEditProductComponent},
    {path: 'edit/:id', component: AddEditProductComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
