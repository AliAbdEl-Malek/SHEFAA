import { APIResponse } from './../../../models/Api-response';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private _apiService:ApiService, private _router: Router, ) { }
  
  ngOnInit(): void {
    this._apiService.get('home/').subscribe((response)=>{
      console.log("Back from server")
    })
    
    // this._apiService.get('user/get').subscribe((response)=>{
    //   let obj = response as APIResponse
    //   if(obj.status){
    //     console.log(obj)
    //     this.students = obj.Data;
    //     this.isLoaded=true;

    //   }
    // })


  }











}
