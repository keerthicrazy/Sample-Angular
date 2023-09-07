import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  form: FormGroup;
  loggedIn:boolean=false;
  loginSubscription:Subscription | undefined;
  constructor(private loginService:LoginService,private formBuilder: FormBuilder,private router:Router,private authService:AuthService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern("[A-Za-z ]{1,15}")]],
      password:['',[Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', [Validators.required, Validators.minLength(20),Validators.maxLength(200)]]
    });
   }

  ngOnInit(): void {
    
  }

  submitUser(){
    this.loginSubscription=this.loginService.submit().subscribe((data: any)=>{
      console.log(data);
      if(data.success){
        this.loggedIn=true;
        this.authService.isLoggedInUser(this.loggedIn);  
                this.router.navigate(['/profile']);
         
      // setTimeout(()=>{
      //   console.log("time is set");
      //   this.router.navigate(['/profile']);   
      // },2000);
      }
    });
  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
   }
}
