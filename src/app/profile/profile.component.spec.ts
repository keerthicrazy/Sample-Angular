import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginService } from '../utils/login.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports:[HttpClientModule],
      providers:[LoginService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the value of user Data', () => {
    let service=fixture.debugElement.injector.get(LoginService);
    const data={
      name:'aarthi',
      bio:'This is my bio'
    }
    spyOn(service,'login').and.returnValue(of(data));
    component.ngOnInit();
    expect(component.userData).toEqual(data);
  });

  it('should call logout from auth service', () => {
    component.logOut();
    expect(localStorage.getItem('loggedIn')).toBeNull();
  });
});
