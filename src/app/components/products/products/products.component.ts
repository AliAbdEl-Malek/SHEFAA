import { Component, OnInit } from '@angular/core';
import { Product } from "./../../../models/Product";
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  cartfake: any;
  favouritefake: any;

  constructor(private _apiService: ApiService, private _cartService: CartService, private _userService: UserService,private _favouriteService:FavouriteService ) { }
  products: Product[] = [];
  userId: any;
  clicked = false;

  ngOnInit(): void {

    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })


    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      console.log("Data from server", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData

        console.log("Product retreived is: ", this.products)

      }
      else {
        alert(obj.message)
      }
    })
    let token1 = this._userService.getToken()
    console.log("Token is:", token1)
    this._apiService.get('user/get/' + token1).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })
    this._apiService.get("cart").subscribe((response) => {
      let obj = response as APIResponse;

      console.log("Data from server cart", obj.Data);
      if (obj.status) {
        let cartData = obj.Data
        this.cartfake = cartData

        console.log("Product retreived is faaaaaake: ", this.cartfake[0].cartProducts)


      }
      else {
        alert(obj.message)
      }
    })
    this._apiService.get("favourite").subscribe((response)=>{
      let obj = response as APIResponse;
     
      console.log("Data from server favourite",obj.Data);
      if(obj.status){
        let favouriteData = obj.Data
         this.favouritefake = favouriteData
         console.log("Favourite product retreived is: ",this.favouritefake[0].favouriteProducts)
       }
       else{
         alert(obj.message)
       }
    })

  }

  addToCart(product: Product) {
    this._cartService.addToCart(product, this.userId);
    // console.log("osamaaaaaaaaaa", product);
    
    
    // if(this.cartfake[0].cartProducts.length == 0 ){
    //   this._cartService.addToCart(product, this.userId);
    //   console.log("mahmouuuuuuud"+this.cartfake[0].cartProducts.length);
    // }
    // else{
    //   for (let index = 0; index < this.cartfake[0].cartProducts.length ; index++) {
    //     console.log("itemmmmmm" + index);
    //     console.log("ffffffffffffffffffffff"+this.cartfake[0].cartProducts.length );
    //     console.log("this.cartfake[0].cartProducts[index]._id"+this.cartfake[0].cartProducts[index]._id);
    //     console.log("product.ID",product._id);
    //     console.log(this.cartfake[0].cartProducts[index]._id !== product._id);
      
    //     if (this.cartfake[0].cartProducts[index]._id !== product._id) {
    //       this._cartService.addToCart(product, this.userId);
    //       console.log("ssssssssssssssss");
    //     } 
    //   }
    // }
    // console.log("Add to Cart Function " + product.name)
    // console.log("Prodact " + product.price)

    // window.alert('Your product has been added to the cart!');
  }


  addToFavourite(product: Product) {
    this._favouriteService.addToFavourite(product, this.userId);
    // console.log("products from addtofavourite is added", product);
    // // console.log("length ",this.favouritefake[0].favouriteProducts.length);
    // if(this.favouritefake[0].favouriteProducts.length == 0 ){
    //   this._favouriteService.addToFavourite(product, this.userId);
    // }
    // else{
    //   for (let index = 0; index < this.favouritefake[0].favouriteProducts.length ; index++) {

    //     // console.log("itemmmmmm" + index);
    //     // console.log("ffffffffffffffffffffff"+this.favouritefake[0].favouriteProducts.length );
    //     // console.log("this.favouritefake[0].favouriteProducts[index]._id"+this.favouritefake[0].favouriteProducts[index]._id);
    //     // console.log("product.ID",product._id);
    //     // console.log(this.favouritefake[0].favouriteProducts[index]._id !== product._id);

    //     if (this.favouritefake[0].favouriteProducts[index]._id !== product._id) {
    //       this._favouriteService.addToFavourite(product, this.userId);
    //     } 
    //   }
    // }
    // console.log("Add to Favourite Function "+product.name)
    // console.log("Prodact "+product.price)
  }


}
