import { Product } from './../../../models/Product';
import { ProductsComponent } from './../products/products.component';
import { APIResponse } from './../../../models/Api-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import {Location} from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product
  productId:any
  constructor(private _activatedRoute:ActivatedRoute ,  private _apiService:ApiService , private _location: Location,private _cartService:CartService ,private _favouriteService:FavouriteService ) { }

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params=>{​​​​​

      this.productId = params['ID']
      console.log("product ID: ",  this.productId )

      this._apiService.get('product/' + this.productId).subscribe((response)=>{​​​​​
        let obj = response as APIResponse;
        console.log("Data from server",obj);

        if(obj.status){
          this.product = obj.Data
           console.log("Product retreived is: ",this.product)
         }
         else{
           alert(obj.message)
         }
      
      }​​​​​);
     }​​​​​);
  }

  backClicked() {
    this._location.back();
    console.log( 'goBack()...' );
  }

  addToCart(product:any) {
    this._cartService.addToCart(product);
    console.log("Add to Cart Function "+product.name)
    console.log("Prodact "+product.price)

    // window.alert('Your product has been added to the cart!');
  }

  addToFavourite(product:any) {
    this._favouriteService.addToFavourite(product);
    console.log("Add to Favourite Function "+product.name)
    console.log("Prodact "+product.price)

    // window.alert('Your product has been added to the cart!');
  }
}
