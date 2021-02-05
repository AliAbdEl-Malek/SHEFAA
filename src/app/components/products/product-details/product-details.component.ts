import { Product } from './../../../models/Product';
import { ProductsComponent } from './../products/products.component';
import { APIResponse } from './../../../models/Api-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product
  productId:any
  constructor(private _activatedRoute:ActivatedRoute ,  private _apiService:ApiService ) { }

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params=>{​​​​​

      this.productId = params['ID']
      console.log("product ID: ",  this.productId )
      this._apiService.get('product/' + this.productId).subscribe((response)=>{​​​​​
        let obj = response as APIResponse;
        console.log("Data from server",obj);

        if(obj.status){
          this.product = obj.Data
           console.log("Product retreived is: ",this.product)
         }
         else{
           alert(obj.message)
         }
      
      }​​​​​);
     }​​​​​);
  }

}
