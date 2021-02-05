import { Component, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _apiService:ApiService , private _router: Router,private _userService:UserService) { }
  user:User;
  ngOnInit(): void {


    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/'+token).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      if(obj.status){
       let userData = obj.Data
        this.user = userData

        console.log("User retreived is: ",this.user)
      }
      else{
        alert(obj.message)
      }
    })
  }

}
