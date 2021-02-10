import { Injectable } from '@angular/core';
import { User} from '../models/user';
import { Product } from '../models/Product';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  list:any[] = [];
  fav:Product[] = [];
  user:User;

  constructor( private _apiService:ApiService) { }

  addToFavourite(product:any , id:any) {
    if (this.fav.indexOf(product) === -1){
      this.fav.push(product);
      this._apiService.put(`favourite/add/${id}`,this.fav).subscribe();
      console.log("favourite "+product);
      this.fav=[];
    }
    else{
      alert("added")
    }
  }

  // getFavourite() {
  //   return this.list;
  // }

  getItemsLength() {
    return this.fav.length;
  }

  clearFavourite() {
    this.list = [];
    return this.list;
  }

  // deleteFavourite(index:number)
  // {
  //   this.list.splice(index,1)
  // }

  deleteFavourite(userId:any,productId:any,index:number){
    this._apiService.put(`favourite/delete/${productId}`,{userId}).subscribe();

    console.log("favourite deleted "+userId+"//"+productId);
    this.fav.splice(index,1);
  }
}
