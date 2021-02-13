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

  constructor(private _apiService: ApiService, private _cartService: CartService, private _userService: UserService,private _favouriteService:FavouriteService ) { }
  products: Product[] = [];
  userId: any;
  paginateProductsArray:any []=[];
  medicineArray:any[]=[];
  hairProductsArray:any[]=[];
  priceArray:any[]=[];
  temporary:any[]=[]
  paginate:any[]=[];

  allstatus:boolean=false;
  medicinestatus:boolean=false;
  cosmitcsstatus:boolean=false;
  
  pages:number=10;

  ngOnInit(): void {
    //---- Get User
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })

    // ---- Get Products
    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      console.log("Data from server", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData
        //for(let i = 0; i <2; i++ )
        // this.paginate=[];
        // for(let i = 0; i < this.len; i++ ){
        //   this.paginate[i]=this.paginateProductsArray[i];
        //   console.log(this.paginateProductsArray[i]);
        //   console.log(this.len)
        // }

        this.paginateProductsArray=this.products;

        // ///---- Medicine Array
        // let j=0;
        // for(let i =0 ;  i<this.products.length ; i++){
        //   if(this.products[i].category==="medicines"){

        //     this.medicineArray[j]=this.products[i];
        //     console.log("product[i]", this.products[i]);
        //     j++
        //   }
        // }

        // ///----- Hair Product Array
        // let x=0;
        // for(let i =0 ; i<this.products.length ; i++){
        //   if(this.products[i].category==="cosmitcs"){

        //     this.hairProductsArray[x]=this.products[i];
        //     console.log("product[i]", this.products[i]);
        //     x++       
        //   }
        // }

        console.log("Product retreived is: ", this.products)
      }
      else {
        alert(obj.message)
      }
    })

    //---- Get Cart Products
    let token1 = this._userService.getToken()
    console.log("Token is:", token1)
    this._apiService.get('user/get/' + token1).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })
    this._apiService.get("cart").subscribe((response) => {
      let obj = response as APIResponse;

      console.log("Data from server cart", obj.Data);
      if (obj.status) {
        let cartData = obj.Data
        this.cartfake = cartData

        console.log("Product retreived is faaaaaake: ", this.cartfake[0].cartProducts)


      }
      else {
        alert(obj.message)
      }
    })

    //---- Get FavouriteProducts
    this._apiService.get("favourite").subscribe((response)=>{
      let obj = response as APIResponse;
     
      console.log("Data from server favourite",obj.Data);
      if(obj.status){
        let favouriteData = obj.Data
         this.favouritefake = favouriteData
         console.log("Favourite product retreived is: ",this.favouritefake[0].favouriteProducts)
       }
       else{
         alert(obj.message)
       }
    })

  }

  addToCart(product: Product) {
    this._cartService.addToCart(product, this.userId);
    
  }


  addToFavourite(product: Product) {
    this._favouriteService.addToFavourite(product, this.userId);
   
  }

  
 //---- Filter Begins

 //---- Medicine
  filterMedicine(checked:boolean){
    this.temporary=[];
    let j=0;
    if(this.allstatus==false){
      if(checked){
        this.medicinestatus=true;
        for(let i =0 ;  i<this.products.length ; i++){
          if(this.products[i].category==="medicines"){
  
            this.medicineArray[j]=this.products[i];
            console.log("product[i]", this.products[i]);
            j++
          }
        }
        // this.paginateProductsArray=this.medicineArray
        j=0;
        if(this.paginateProductsArray.length==this.products.length){
          this.paginateProductsArray=[];
        }
        
        let filterLength=this.paginateProductsArray.length;
        for(let k=0;k<this.medicineArray.length;k++)
        {
          this.paginateProductsArray[filterLength]=this.medicineArray[k];
          filterLength++
        }
        
        this.medicineArray=[];
        console.log("this.medicineArray[i]",this.paginateProductsArray);  
      }
  
      else{
        this.medicinestatus=false;
         let x=0
        //   if(this.temporary.length>0){
        //     x=this.temporary.length
        //   }
        for(let i =0 ;  i<this.paginateProductsArray.length ; i++){
          if(this.paginateProductsArray[i].category!=="medicines")
          {
            this.temporary[x]=this.paginateProductsArray[i]
            x++
          }
        }
        this.paginateProductsArray=this.temporary
        // this.paginateProductsArray=this.products
      }
    }
    

    if(this.paginateProductsArray.length==0)
    {
      this.paginateProductsArray=this.products
    }

  }

  //---- Hair Product
  filterHairProduct(checked:boolean){
    this.temporary=[];
    let x=0;
    if(this.allstatus==false){
      if(checked){
        this.cosmitcsstatus=true;
        for(let i =0 ; i<this.products.length ; i++){
          if(this.products[i].category==="cosmitcs"){
  
            this.hairProductsArray[x]=this.products[i];
            console.log("product[i]", this.products[i]);
            x++       
          }
        }
        // this.paginateProductsArray=this.hairProductsArray
        x=0;
        if(this.paginateProductsArray.length==this.products.length){
          this.paginateProductsArray=[];
        }
  
        let filterLength=this.paginateProductsArray.length;
        for(let k=0;k<this.hairProductsArray.length;k++)
        {
          this.paginateProductsArray[filterLength]=this.hairProductsArray[k];
          filterLength++
        }
  
        this.hairProductsArray=[]
        console.log("this.hairProductsArray[i]",this.paginateProductsArray);
      }
  
      else{
        this.cosmitcsstatus=false;
        let x=0
        for(let i =0 ;  i<this.paginateProductsArray.length ; i++){
          if(this.paginateProductsArray[i].category!=="cosmitcs")
          {
            this.temporary[x]=this.paginateProductsArray[i]
            x++
          }
        }
        this.paginateProductsArray=this.temporary
      }
    }
    

    if(this.paginateProductsArray.length==0)
    {
      this.paginateProductsArray=this.products
    }

  }

  allProducts(checked:boolean){
    if(checked){
      this.allstatus=true;
      this.paginateProductsArray=this.products;
    }
    
    else{
      this.allstatus=false;
      this.paginateProductsArray=[];
      if(this.medicinestatus===true){
        this.filterMedicine(checked);
      }
      if(this.cosmitcsstatus===true){
        this.filterHairProduct(checked);
      }
      
      if(this.paginateProductsArray.length==0){
        this.paginateProductsArray=this.products;
      }
    }
    
  }

  // len=(this.products.length);

  firstPage(){
    let len=(this.products.length)/4;
    this.paginate=[];
    for(let i = 0; i < 2; i++ ){
      this.paginate[i]=this.paginateProductsArray[i];
      console.log(this.paginateProductsArray[i]);
      console.log(len)
    }
  }

  secondPage(){
    this.paginate=[];
    for(let i = 0; i < 2; i++ ){
      this.paginate[i]=this.paginateProductsArray[i+2];
      console.log(this.paginateProductsArray[i+2]);
    }
  }

  thirdPage(){
    this.paginate=[];
    for(let i = 0; i < 2; i++ ){
      this.paginate[i]=this.paginateProductsArray[i+(2*2)];
      console.log(this.paginateProductsArray[i+(2*2)]);
    }
  }

  fourthPage(){
    this.paginate=[];
    for(let i = 0; i < 2; i++ ){
      this.paginate[i]=this.paginateProductsArray[i+(2*3)];
      console.log(this.paginateProductsArray[i+(2*3)]);
    }
  }
  

}





// import { Component, OnInit } from '@angular/core';
// import { Product } from "./../../../models/Product";
// import { APIResponse } from './../../../models/Api-response';
// import { UserService } from './../../../services/user.service';
// import { ApiService } from './../../../services/api.service';
// import { FavouriteService } from 'src/app/services/favourite.service';
// import { CartService } from 'src/app/services/cart.service';
// import { User } from 'src/app/models/user';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {

//   cartfake: any;
//   favouritefake: any;

//   constructor(private _apiService: ApiService, private _cartService: CartService, private _userService: UserService,private _favouriteService:FavouriteService ) { }
//   products: Product[] = [];
//   userId: any;
  

//   ngOnInit(): void {

//     let token = this._userService.getToken()
//     console.log("Token is:", token)
//     this._apiService.get('user/get/' + token).subscribe((response) => {
//       let obj = response as APIResponse
//       console.log("Data from server", obj)
//       this.userId = obj.Data["id"]
//     })


//     this._apiService.get("product").subscribe((response) => {
//       let obj = response as APIResponse;
//       console.log("Data from server", obj);
//       if (obj.status) {
//         let productData = obj.Data
//         this.products = productData

//         console.log("Product retreived is: ", this.products)

//       }
//       else {
//         alert(obj.message)
//       }
//     })
//     let token1 = this._userService.getToken()
//     console.log("Token is:", token1)
//     this._apiService.get('user/get/' + token1).subscribe((response) => {
//       let obj = response as APIResponse
//       console.log("Data from server", obj)
//       this.userId = obj.Data["id"]
//     })
//     this._apiService.get("cart").subscribe((response) => {
//       let obj = response as APIResponse;

//       console.log("Data from server cart", obj.Data);
//       if (obj.status) {
//         let cartData = obj.Data
//         this.cartfake = cartData

//         console.log("Product retreived is faaaaaake: ", this.cartfake[0].cartProducts)


//       }
//       else {
//         alert(obj.message)
//       }
//     })
//     this._apiService.get("favourite").subscribe((response)=>{
//       let obj = response as APIResponse;
     
//       console.log("Data from server favourite",obj.Data);
//       if(obj.status){
//         let favouriteData = obj.Data
//          this.favouritefake = favouriteData
//          console.log("Favourite product retreived is: ",this.favouritefake[0].favouriteProducts)
//        }
//        else{
//          alert(obj.message)
//        }
//     })

//   }

//   addToCart(product: Product) {
//     this._cartService.addToCart(product, this.userId);
//     // console.log("osamaaaaaaaaaa", product);
    
    
//     // if(this.cartfake[0].cartProducts.length == 0 ){
//     //   this._cartService.addToCart(product, this.userId);
//     //   console.log("mahmouuuuuuud"+this.cartfake[0].cartProducts.length);
//     // }
//     // else{
//     //   for (let index = 0; index < this.cartfake[0].cartProducts.length ; index++) {
//     //     console.log("itemmmmmm" + index);
//     //     console.log("ffffffffffffffffffffff"+this.cartfake[0].cartProducts.length );
//     //     console.log("this.cartfake[0].cartProducts[index]._id"+this.cartfake[0].cartProducts[index]._id);
//     //     console.log("product.ID",product._id);
//     //     console.log(this.cartfake[0].cartProducts[index]._id !== product._id);
      
//     //     if (this.cartfake[0].cartProducts[index]._id !== product._id) {
//     //       this._cartService.addToCart(product, this.userId);
//     //       console.log("ssssssssssssssss");
//     //     } 
//     //   }
//     // }
//     // console.log("Add to Cart Function " + product.name)
//     // console.log("Prodact " + product.price)

//     // window.alert('Your product has been added to the cart!');
//   }


//   addToFavourite(product: Product) {
//     this._favouriteService.addToFavourite(product, this.userId);
//     // console.log("products from addtofavourite is added", product);
//     // // console.log("length ",this.favouritefake[0].favouriteProducts.length);
//     // if(this.favouritefake[0].favouriteProducts.length == 0 ){
//     //   this._favouriteService.addToFavourite(product, this.userId);
//     // }
//     // else{
//     //   for (let index = 0; index < this.favouritefake[0].favouriteProducts.length ; index++) {

//     //     // console.log("itemmmmmm" + index);
//     //     // console.log("ffffffffffffffffffffff"+this.favouritefake[0].favouriteProducts.length );
//     //     // console.log("this.favouritefake[0].favouriteProducts[index]._id"+this.favouritefake[0].favouriteProducts[index]._id);
//     //     // console.log("product.ID",product._id);
//     //     // console.log(this.favouritefake[0].favouriteProducts[index]._id !== product._id);

//     //     if (this.favouritefake[0].favouriteProducts[index]._id !== product._id) {
//     //       this._favouriteService.addToFavourite(product, this.userId);
//     //     } 
//     //   }
//     // }
//     // console.log("Add to Favourite Function "+product.name)
//     // console.log("Prodact "+product.price)
//   }


// }
