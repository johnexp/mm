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
    const headerOptions: any = {
      'Content-Type': 'application/json; charset=UTF-8'
    };
    try {
      let userJson: string = '{}';
      const userStorage = localStorage.getItem('currentUser');
      if (typeof userStorage === 'string') {
        userJson = userStorage;
      }
      const currentUser = JSON.parse(userJson);
      if (currentUser && currentUser.token) {
        headerOptions['Authorization'] = 'Bearer ' + currentUser.token;
      }
    } catch (e) {
      return null;
    }
    const options = {
      headers: new HttpHeaders(headerOptions)
    };

    return options;
  }

  private handleError(response: any) {
    if (response.status === 401) {
      // 401 unauthorized response so log user out of client
      window.location.href = '/login';
    }
    if (response.status === 403) {
      return Observable.throw('Permissões insuficientes');
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
