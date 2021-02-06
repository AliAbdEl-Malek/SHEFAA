import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  list:any[] = [];
  constructor() { }
  addToFavourite(product:any) {
    this.list.push(product);
  }

  getFavourite() {
    return this.list;
  }

  getItemsLength() {
    return this.list.length;
  }

  clearFavourite() {
    this.list = [];
    return this.list;
  }

  deleteFavourite(index:number)
  {
    this.list.splice(index,1)
  }
}
