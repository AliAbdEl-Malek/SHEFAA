import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.css']
})
export class FavouriteProductsComponent implements OnInit {

  constructor(private _favouriteService:FavouriteService ,private _cartService:CartService ) { }
  favourites = this._favouriteService.getFavourite();
  length = this._favouriteService.getItemsLength();
  ngOnInit(): void {
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
    this._cartService.addToCart(product);
    console.log("Add to Cart Function "+product.name)
    console.log("Prodact "+product.price)

  }

}
