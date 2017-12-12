import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const urlParams = state.url.split('/');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let permissionFound = state.url === '/' || null;

    if (!permissionFound) {
      if (state.url.startsWith('/') && urlParams.length > 2) {
        permissionFound = currentUser.permissions.find(permission => {
          return permission.stringfied === urlParams[1] + ':' + urlParams[2];
        });
      } else if (state.url.startsWith('/') && urlParams.length === 2) {
        permissionFound = currentUser.permissions.find(permission => {
          return permission.stringfied === urlParams[1];
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
