import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from '../utils/login.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[BrowserModule,FormsModule,ReactiveFormsModule,HttpClientModule],
      providers: [
        LoginService,
        { provide: Router, useValue: mockRouter},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with four controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
    expect(component.form.contains('bio')).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['password'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['bio'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.form.controls['name'].setValue('aarthi');
    component.form.controls['password'].setValue('623366');
    component.form.controls['email'].setValue('aa@aa.com');
    component.form.controls['bio'].setValue('this is my bio');
    component.submitUser();
    expect(component.form.valid).toBeTruthy();
  });

  it('should allow user to submit and login to profile', () => {
    const formData = {
      "name":"aarthi",
      "email": "something@somewhere.com",
      "password": "8938ndis",
      "bio":"This is my bio"
    };
    component.form.setValue(formData);
    let service=fixture.debugElement.injector.get(LoginService);
    const data={
      success:true
    }
    spyOn(service,'submit').and.returnValue(of(data));
    component.submitUser();
    expect(component.loggedIn).toBeTruthy();
    expect (mockRouter.navigate).toHaveBeenCalledWith (['/profile']);
  });

});
