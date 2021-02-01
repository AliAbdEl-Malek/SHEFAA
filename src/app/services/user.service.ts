import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  logged=new Subject<boolean>();

  constructor() { 
    //alert(this.isLogged());
    // this.logged.next(this.isLogged());
  }
  // login(email:string){

    
  //   localStorage.setItem("Email",email);
  //   //this.logged.next(true);
  //   this.setLoggedStatus(true);
  // }
  addToken(token:string)
  {
    localStorage.setItem("token",token);
  }
  getToken()
  {
   return localStorage.getItem("token");
  }


  logout(){
    localStorage.removeItem("token");
    //this.logged.next(false);
    this.setLoggedStatus(false);
  }

 

  setLoggedStatus(status:boolean)
  {
    this.logged.next(status);
  }

  getLoggedStatus() : Observable<any>{
    return this.logged.asObservable();
  }

  isLogged():boolean
  {
    let token=localStorage.getItem("token");
    if(token==null)
      return false;

      return true;
  }

}
