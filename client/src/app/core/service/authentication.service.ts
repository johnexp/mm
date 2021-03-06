import { CustomHttp } from './../helpers/custom.http';
import { Router } from '@angular/router';
import { User } from './../domain/user';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

@Injectable()
export class AuthenticationService {

  private path = '/user/authenticate';

  constructor(private http: CustomHttp,
    private router: Router) { }

  login(username: string, password: string): Observable<User | null> {
    return this.http.post<User>(this.path, { username: username, password: password })
      .map(user => {
        try {
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        } catch (e) {
          return null;
        }
      });
  }

  logout() {
    try {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
    } catch (e) {

    }
    this.router.navigate(['/login']);
  }

  getAuthorization() {
    try {
      if (localStorage.getItem('currentUser')) {
        return JSON.parse(localStorage.getItem('currentUser') || '').token;
      }
    } catch (e) {

    }
    return null;
  }
}
