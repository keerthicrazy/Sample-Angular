import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
  let router = {
    navigate: jasmine.createSpy('navigate')
};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      {provide: Router, useValue: router},
      { provide: AuthService, useValue: authService },
    ]}).compileComponents();
    
    guard = TestBed.inject(AuthGuard);    
    authService.isAuthenticated.and.returnValue(of(true));
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('user should be authenticated', () => {    
    guard.canActivateChild();
    expect(guard.canActivateChild).toBeTruthy();
  });

  xit('user should not be authenticated', () => {
    authService.isAuthenticated.and.returnValue(of(false));
    guard.canActivateChild();
    expect (router.navigate).toHaveBeenCalledWith (['/']);
  });
});