import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items:any[] = [];
  constructor() { }
  addToCart(product:any) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

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
}

