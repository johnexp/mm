import { GenericService } from './generic.service';
import { User } from './../domain/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService extends GenericService {

  private path = '/user';

  createOrUpdate(user: User): Observable<User> {
    if (user._id) {
      return this.updateUser(user);
    } else {
      return this.create(user);
    }
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.path)
      .pipe(catchError(this.handleError<User[]>([])));
  }

  get(id: string): Observable<User> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError<User>()));
  }

  getCurrent(): Observable<User> {
    const url = `${this.path}/current`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError<User>()));
  }

  create(user: User): Observable<User> {
    const url = this.path + '/register';
    return this.http.post<User>(url, user)
      .pipe(catchError(this.handleError<User>()));
  }

  updateSelf(user: User): Observable<User> {
    return this.http.put<User>(this.path + '/self/' + user._id, user)
      .pipe(catchError(this.handleError<User>()));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.path + '/' + user._id, user)
      .pipe(catchError(this.handleError<User>()));
  }

  delete(id: string): Observable<User> {
    const url = `${this.path}/${id}`;
    return this.http.delete<User>(url)
      .pipe(catchError(this.handleError<User>()));
  }

}
