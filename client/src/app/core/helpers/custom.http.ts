import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomHttp extends HttpClient {

  constructor(httpHandler: HttpHandler) {
    super(httpHandler);
  }

  get<T>(url: string): Observable<T> {
    return super.get<T>(AppSettings.API_ENDPOINT + url, this.getOptions()).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any): Observable<T> {
    return super.post<T>(AppSettings.API_ENDPOINT + url, body, this.getOptions()).pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any): Observable<T> {
    return super.put<T>(AppSettings.API_ENDPOINT + url, body, this.getOptions()).pipe(catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    return super.delete<T>(AppSettings.API_ENDPOINT + url, this.getOptions()).pipe(catchError(this.handleError));
  }

  // private helper methods

  private getOptions() {
    // add authorization header with jwt token
    const headerOptions = {
      'Content-Type': 'application/json; charset=UTF-8'
    };
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      headerOptions['Authorization'] = 'Bearer ' + currentUser.token;
    }
    const options = {
      headers: new HttpHeaders(headerOptions)
    }

    return options;
  }

  private handleError(response: any) {
    if (response.status === 401) {
      // 401 unauthorized response so log user out of client
      window.location.href = '/login';
    }

    return Observable.throw(response.error.message);
  }
}

export function customHttpFactory(httpHandler: HttpHandler): HttpClient {
  return new CustomHttp(httpHandler);
}

export let customHttpProvider = {
  provide: HttpClient,
  useFactory: customHttpFactory,
  deps: [HttpHandler]
};
