import { AppSettings } from './../../app.settings';
import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(AppSettings.SERVER_URL + url, this.addJwt(options)).catch(this.handleError);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(AppSettings.SERVER_URL + url, body, this.addJwt(options)).catch(this.handleError);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(AppSettings.SERVER_URL + url, body, this.addJwt(options)).catch(this.handleError);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(AppSettings.SERVER_URL + url, this.addJwt(options)).catch(this.handleError);
  }

  // private helper methods

  private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
    // ensure request options and headers are not null
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    // add authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      options.headers.append('Authorization', 'Bearer ' + currentUser.token);
    }

    return options;
  }

  private handleError(error: any) {
    if (error.status === 401) {
      // 401 unauthorized response so log user out of client
      window.location.href = '/login';
    }

    return Observable.throw(error._body);
  }
}

export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new CustomHttp(xhrBackend, requestOptions);
}

export let customHttpProvider = {
  provide: Http,
  useFactory: customHttpFactory,
  deps: [XHRBackend, RequestOptions]
};
