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
  productId : number = 0;
  product : ProductsComponent ;

  constructor(private _activatedRoute:ActivatedRoute ,  private _apiService:ApiService ) { }

  ngOnInit(): void {
    // this._activatedRoute.paramMap.subscribe(params=>{​​​​​
    //   //alert("subscribe");
    //   this.productId = +params.get('id');
    //   this._apiService.getDetails(this.productId).subscribe((response:APIResponse)=>{​​​​​

    //     this.product = response.Data;
      
    //   }​​​​​);
    //  }​​​​​);
  }

}
