import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';


const routes :Routes = [
  {path:'', component:IndexComponent},
  {path:'details/:id', component:ProductDetailsComponent},


]


@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent, IndexComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, SharedModule
  ]
})
export class ProductsModule { }
