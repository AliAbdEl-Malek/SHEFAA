import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.component.html',
  styleUrls: ['./your-cart.component.css']
})
export class YourCartComponent implements OnInit {

  quantity:string="";
  price:string="";

  constructor(private _cartService:CartService ) { }
  items = this._cartService.getItems();
  ngOnInit(): void {
  }

}
