import { Component, OnInit } from '@angular/core';
import { Product }from "./../../../models/Product";
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  constructor( private _apiService:ApiService,private _cartService:CartService  ) { }
  products:Product[]=[];
  ngOnInit(): void {

    this._apiService.get("product").subscribe((response)=>{
      let obj = response as APIResponse;
      console.log("Data from server",obj);
      if(obj.status){
        let productData = obj.Data
         this.products = productData
 
         console.log("Product retreived is: ",this.products)
       }
       else{
         alert(obj.message)
       }
    })

  }

  addToCart(product:any) {
    this._cartService.addToCart(product);
    console.log("Add to Cart Function "+product.name)
    console.log("Prodact "+product.price)

    // window.alert('Your product has been added to the cart!');
  }

}
