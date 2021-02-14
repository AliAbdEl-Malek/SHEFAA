import { Order } from './../../../models/order';
import { Component, Input, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-and-previous-orders',
  templateUrl: './user-profile-and-previous-orders.component.html',
  styleUrls: ['./user-profile-and-previous-orders.component.css']
})
export class UserProfileAndPreviousOrdersComponent implements OnInit {
  user: User;
  previousOrdersIDs: any[] = []
  previousOrdersData: Order[] = []
  previousOrders: any[] = [] //array of product ids for each order
  productsData: any[] = []

  constructor(private _apiService: ApiService, private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {

    let token = this._userService.getToken()
    // console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      // console.log("Data from server",obj)
      if (obj.status) {
        this.user = obj.Data
        this.previousOrdersIDs = this.user.orders
        // console.log("previous Orders IDs are: ",this.previousOrdersIDs);

        //get orders data
        // this.getOrderData()


      }
      else {
        if (obj.message == "Session expired!") {
          alert(obj.message + "Login again!")
          this._router.navigateByUrl('registeration/logout')
        }
      }
    })








  }



 


  // async getOrderData() {
  //   // let temp = [... this.previousOrders]

  //   for (let orderID of this.previousOrdersIDs) {
  //     await this._apiService.get('order/' + orderID).subscribe((response) => {
  //       let obj = response as APIResponse
  //       if (obj.status) {
  //         this.previousOrdersData.push(obj.Data)
  //         this.previousOrders.push(...obj.Data.order)
          
  //         //get products data
  //         // this.getProductsData()
  //       }
  //       else {
  //         console.log(obj.message);
  //       }
  //     })
  //   }

  //   // console.log("previous Orders Data are:", this.previousOrdersData);
  //   console.log("previous Orders are:", this.previousOrders);
  //   // console.log("temp",temp);
    

  // }


  // async getProductsData() {

  //   let tempArray = new Array()

  //   for (let order of this.previousOrders) {
  //     for (let id of order) {
  //       await this._apiService.get('product/' + id).subscribe((response) => {
  //         let obj = response as APIResponse
  //         if (obj.status) {
  //           tempArray.push(obj.Data)
  //         } else {
  //           console.log(obj.message)
  //         }
  //       })
  //     }

  //   }
  //   this.productsData.push(tempArray)

  //   console.log("product data:", this.productsData)
  // }





























}
