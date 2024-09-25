import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { MapsComponent } from './components/maps/maps.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChartComponent } from './components/chart/chart.component';

export const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:id', component: AddEditProductComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'calendar', component: CalendarComponent },
  {path: 'charts', component: ChartComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
