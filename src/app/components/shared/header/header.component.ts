import { Product } from './../../../models/Product';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router, private _userService: UserService, private _cartService: CartService) { }
  user: User;
  searchText:string = '';
  products: Product[] = []
  productNames: string[] = []
  items = this._cartService.getItemsLength();

  ngOnInit(): void {

    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("User Retrieved: ", obj)
      if (obj.status) {
        this.user = obj.Data
      }
      else {
        alert(obj.message)
      }
    })

    
    // this._apiService.get('product/').subscribe((response) => {
    //   let obj = response as APIResponse
    //   console.log("Data from server", obj)
    //   if (obj.status) {
    //     this.products = obj.Data
    //     console.log("products retreived are: ", this.products)

    //     //iterate for produc names
    //     for (let i = 0; i < this.products.length; i++) {
    //       this.productNames.push(this.products[i].name)
    //     }
    //     console.log("this.productNames", this.productNames)
    //   }
    //   else {
    //     alert(obj.message)
    //   }
    // })




  }



  updateSearchText(value: string) {    
    this.searchText = value
    console.log(this.searchText)
  }


 




  routeToProductDetails(productName: string) {
    console.log("productName", productName)
    console.log("productName type", typeof (productName))

    this._apiService.get(`product/get/` + productName).subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        console.log("product retreived is: ", obj)
        this._router.navigate(['products/details'], { queryParams: { ID: obj.Data.ID } })
      }
      else {
        alert(obj.message)
      }
    })
  }







}
