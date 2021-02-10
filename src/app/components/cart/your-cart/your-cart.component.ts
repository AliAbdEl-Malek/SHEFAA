import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/Api-response';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.component.html',
  styleUrls: ['./your-cart.component.css']
})
export class YourCartComponent implements OnInit {

  quantity:string="";
  price:string="";
  cartProducts:User [] = [];
  userId: any;
  

  constructor(private _cartService:CartService, private _apiService:ApiService, private _userService:UserService ) { }
  
  ngOnInit(): void {
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/'+token).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      this.userId=obj.Data["id"]
    })
    this._apiService.get("cart").subscribe((response)=>{
      let obj = response as APIResponse;
     
      console.log("Data from server cart",obj.Data);
      if(obj.status){
        let cartData = obj.Data
         this.cartProducts = cartData
 
         console.log("Product retreived is: ",this.cartProducts)
         
        
       }
       else{
         alert(obj.message)
       }
    })
  }
  delete(productId:any ,index:number ){
    console.log(productId);
    console.log(this.userId);
    console.log("ahmaaaaaaaaaaaa"+index);
    console.log("mamamamamamam",this.cartProducts[0]);
    this.cartProducts[0].cartProducts.splice(index,1);
    
    this._cartService.deleteFromCart(this.userId , productId ,index);
    
  }
  
  increaseQuantity (i:any){
    
    i.itemQuantity += 1;
  }
}
