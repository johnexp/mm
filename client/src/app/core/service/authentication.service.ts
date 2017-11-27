import { AppSettings } from './../../app.settings';
import { User } from './../domain/user';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  private resourceUrl = AppSettings.SERVER_URL + '/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    const url = this.resourceUrl + '/authenticate';
    return this.http.post<User>(url, { username: username, password: password }, httpOptions)
      .map(user => {
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getAuthorization() {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }
}
