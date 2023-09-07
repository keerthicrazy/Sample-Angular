import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    userData:any
    check:any;
    loginSubscription:Subscription | undefined;
  constructor(private loginService:LoginService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginSubscription=this.loginService.login().subscribe((data: any)=>{
      this.userData=data;
      console.log(this.userData);
    });
  }
  logOut():void {
    this.router.navigate(['/']);    
    this.authService.logOut();
  }
  ngOnDestroy(): void {
   this.loginSubscription?.unsubscribe();
  }

}
