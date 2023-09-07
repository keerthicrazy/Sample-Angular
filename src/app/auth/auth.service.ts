import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedUser:any=false;

  constructor() { 
    this.isAuthenticatedUser = (localStorage.getItem('loggedIn')? true: false);
  }
 

  isLoggedInUser(loggedIn:boolean):void{
    localStorage.setItem('loggedIn',JSON.stringify(loggedIn));
    this.isAuthenticatedUser=loggedIn;
  }
  isAuthenticated():Observable<any>{
    return this.isAuthenticatedUser;
  }
  logOut():void{
    localStorage.removeItem('loggedIn');
  }
}
