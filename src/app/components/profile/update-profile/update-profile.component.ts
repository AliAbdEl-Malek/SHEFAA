import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router, private _userService: UserService, private _formBuilder:FormBuilder) { }
  user: User;
  formGroup:FormGroup;

  ngOnInit(): void {

    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server in update user:", obj)
      if (obj.status) {
        let userData = obj.Data
        this.user = userData

      }
    })



    this.formGroup = this._formBuilder.group({
      name:[,[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      email:['',[Validators.required, Validators.email,Validators.minLength(6), Validators.maxLength(50)]],
      mobile:[''],
      address:['']
    })
  }

  updateUser(){
    let user = new User();
    user = this.formGroup.value

    this._apiService.put('user/update/'+ this.user.id,user).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      if(obj.status){
        alert(obj.message)
        this._router.navigateByUrl('profile')
      }
      else{
        alert(obj.message)
      }
    })
  }








}
