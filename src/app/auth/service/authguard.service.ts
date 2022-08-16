import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements OnDestroy{
  bool: boolean;
  subscriptions: Subscription[]=[];
  constructor(private authService: AuthService, private router: Router) { }
  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    this.subscriptions=[];
    if (!this.authService.isLoggedIn()) {
      this.authService.message$.next('Please Login to Continue');
      this.router.navigateByUrl('/login');
      return false;
    }
    else{
    this.subscriptions.push(
      this.authService.getRole().subscribe({
        next: (data)=>{
          if (this.authService.isLoggedIn()) {
          const userRole = data.role;
         if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
          this.authService.message$.next('Unauthorized Privileges');
         this.router.navigateByUrl('/login');
         this.bool= false;
      }
      this.bool = true;
      }
      else{
        console.log('here');
      this.authService.message$.next('Please Login to Continue');
      this.router.navigateByUrl('/login');
      this.bool = false;
      }
        },
        error: (e)=> {
          this.authService.message$.next('Error');
        }
      })
      );
    }
    return this.bool;
  }
    ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
    }
}