import { Injectable } from '@angular/core';
import { User} from '../models/user';
import { Product } from '../models/Product';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
   products :any [] ;
  items:Product[] = [];
  user:User;
  isAddedToCart: boolean =false;
  constructor( private _apiService:ApiService) { }

  addToCart(product:any , id:any) {
    // let productExists = false;

    // for( let i in this.items) {
      
    //   if (product.ID != this.items[i].ID){
        
       

    //   }else{
    //     alert("Aleardy added");
    //   }
    // if(this.isAddedToCart == false){
      
    //   console.log("Add to Cart Function "+product.name)
    //   console.log("Prodact "+product.price)
    //   product.isAddToCart = true;
    // }else{
    //   alert("added");
    // }    
      if (this.items.indexOf(product) === -1){
        this.items.push(product);
        this._apiService.put(`cart/add/${id}`,this.items).subscribe();
        console.log("cart talaya"+product);
        this.items=[];
      }else{alert("added")}
  
  }

<<<<<<< HEAD
  getItemsLength() {
    return this.items.length;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  deleteCart(index:number)
  {
    this.items.splice(index,1)
  }
=======

  deleteFromCart(userId:any,productId:any,index:number){
    this._apiService.put(`cart/delete/${productId}`,{userId}).subscribe();

    console.log("tataaaaaaa"+userId+"//"+productId);
    this.items.splice(index,1);
  }

  // getItems() {
  //    return this._apiService.get("cart").subscribe();
    
  // }

  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }
>>>>>>> cart-and-products
}

