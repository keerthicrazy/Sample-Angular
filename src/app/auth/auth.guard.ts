import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  // canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //      const isAuthenticated = this.authService.isAuthenticated();
  //     if (!isAuthenticated) {
  //         this.router.navigate(['/']);
  //     }
  //     return isAuthenticated;
  // }

  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.authService.isAuthenticated().pipe(take(1), tap(isAuthenticated => {
      //   if (!isAuthenticated) this.router.navigate(['/']);
      //   return isAuthenticated;
      // }));
    
       const isAuthenticated = this.authService.isAuthenticated();
      if (!isAuthenticated) {
          this.router.navigate(['/']);
      }
      return isAuthenticated;

  }
  
}
