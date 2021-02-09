import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.css']
})
export class FavouriteProductsComponent implements OnInit {
  userId: any;

  constructor(private _favouriteService:FavouriteService ,private _cartService:CartService ,  private _apiService:ApiService, private _userService: UserService) { }
  favourites = this._favouriteService.getFavourite();
  length = this._favouriteService.getItemsLength();
  ngOnInit(): void {
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })
  }

  deleteFavourite(index:any) {
    this._favouriteService.deleteFavourite(index);
    console.log("delete from Favourite Function "+index)
    console.log("Prodact "+index)
  }

  clearFavourite() {
    this._favouriteService.clearFavourite();
    console.log("clear list ")
  }

  addToCart(product:any) {
    this._cartService.addToCart(product,this.userId);
    console.log("Add to Cart Function "+product.name)
    console.log("Prodact "+product.price)

  }

}
