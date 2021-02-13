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

  constructor(private _apiService: ApiService, private _cartService: CartService, private _userService: UserService, private _favouriteService: FavouriteService) { }
  products: Product[] = [];
  userId: any;
  filterArray: any[] = [];
  medicineArray: any[] = [];
  hairProductsArray: any[] = [];
  priceArray: any[] = [];
  temporary: any[] = []
  paginate: any[] = [];
  currentPage: any[] = [];

  badgeNumber:number=0
  user: User
  cart: any[] = []

  allstatus: boolean = false;
  medicinestatus: boolean = false;
  cosmitcsstatus: boolean = false;

  // pages: number = 10;

  ngOnInit(): void {
    //---- Get User
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("User retreived in product component", obj)
      this.user = obj.Data
      this.userId = obj.Data["id"]

    })

    // ---- Get Products
    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      console.log("Product retreived is:", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData


        this.filterArray = this.products;

        let length = this.filterArray.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.paginate[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.paginate[i].push(this.filterArray[j])
          }
          pageIterator += 9
          pageCodition += 9
          // console.log("this.paginate[i]",this.paginate[i]);
        }
        this.currentPage = this.paginate[0]

      }
      else {
        alert(obj.message)
      }
    })


    //get badge number from cart service 
    // this.badgeNumber = this._cartService.length






  }

  pagination(index: any) {
    this.currentPage = this.paginate[index]

  }

  addToCart(id: any) {
    this._cartService.addToCart(id);
    // this.cart.push(id)
    this.badgeNumber++
  }



  addToFavourite(id: any) {
    this._favouriteService.addToFavourite(id);

  }


  //---- Filter Begins

  //---- Medicine
  filterMedicine(checked: boolean) {
    this.temporary = [];
    let j = 0;
    if (this.allstatus == false) {
      if (checked) {
        this.medicinestatus = true;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === "medicine" || this.products[i].category === "Medicine") {

            this.medicineArray[j] = this.products[i];
            console.log("product[i]", this.products[i]);
            j++
          }
        }
        // this.filterArray=this.medicineArray
        j = 0;
        if (this.filterArray.length == this.products.length) {
          this.filterArray = [];
        }

        let filterLength = this.filterArray.length;
        for (let k = 0; k < this.medicineArray.length; k++) {
          this.filterArray[filterLength] = this.medicineArray[k];
          filterLength++
        }

        this.medicineArray = [];
        console.log("this.medicineArray[i]", this.filterArray);
      }

      else {
        this.medicinestatus = false;
        let x = 0
        //   if(this.temporary.length>0){
        //     x=this.temporary.length
        //   }
        for (let i = 0; i < this.filterArray.length; i++) {
          if (this.filterArray[i].category !== "medicine" && this.products[i].category !== "Medicine") {
            this.temporary[x] = this.filterArray[i]
            x++
          }
        }
        this.filterArray = this.temporary
        // this.filterArray=this.products
      }
    }


    if (this.filterArray.length == 0) {
      this.filterArray = this.products
    }

  }

  //---- Hair Product
  filterHairProduct(checked: boolean) {
    this.temporary = [];
    let x = 0;
    if (this.allstatus == false) {
      if (checked) {
        this.cosmitcsstatus = true;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === "Hair Products") {

            this.hairProductsArray[x] = this.products[i];
            console.log("product[i]", this.products[i]);
            x++
          }
        }
        // this.filterArray=this.hairProductsArray
        x = 0;
        if (this.filterArray.length == this.products.length) {
          this.filterArray = [];
        }

        let filterLength = this.filterArray.length;
        for (let k = 0; k < this.hairProductsArray.length; k++) {
          this.filterArray[filterLength] = this.hairProductsArray[k];
          filterLength++
        }

        this.hairProductsArray = []
        console.log("this.hairProductsArray[i]", this.filterArray);
      }

      else {
        this.cosmitcsstatus = false;
        let x = 0
        for (let i = 0; i < this.filterArray.length; i++) {
          if (this.filterArray[i].category !== "Hair Products") {
            this.temporary[x] = this.filterArray[i]
            x++
          }
        }
        this.filterArray = this.temporary
      }
    }


    if (this.filterArray.length == 0) {
      this.filterArray = this.products
    }

  }

  allProducts(checked: boolean) {
    if (checked) {
      this.allstatus = true;
      this.filterArray = this.products;
    }

    else {
      this.allstatus = false;
      this.filterArray = [];
      if (this.medicinestatus === true) {
        this.filterMedicine(checked);
      }
      if (this.cosmitcsstatus === true) {
        this.filterHairProduct(checked);
      }

      if (this.filterArray.length == 0) {
        this.filterArray = this.products;
      }
    }

  }








}
