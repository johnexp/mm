import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.roles.indexOf('admin') > -1) {
      return true;
    }
    return this.activationLogic(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.activationLogic(state);
  }

  activationLogic(state: RouterStateSnapshot): boolean {
    const urlParams = state.url.split('/');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let permissionFound = state.url === '/' || null;

    if (!permissionFound) {
      if (state.url.startsWith('/') && urlParams.length > 2) {
        permissionFound = currentUser.permissions.find(permission => {
          return permission.stringfied === urlParams[2] + ':' + urlParams[3];
        });
      } else if (state.url.startsWith('/') && urlParams.length === 3) {
        permissionFound = currentUser.permissions.find(permission => {
          return permission.stringfied === urlParams[2];
        });
      }
    }

    if (currentUser) {
      if (permissionFound) {
        // logged in so return true
        return true;
      }
      return false;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
