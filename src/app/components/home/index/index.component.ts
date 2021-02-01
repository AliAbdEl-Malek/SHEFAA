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
   

  }











}
