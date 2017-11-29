import { AppSettings } from './../app.settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HomeService {

  private resourceUrl = AppSettings.API_ENDPOINT;

  constructor(public http: HttpClient) { }

  getBanners() {
    return this.http.get<any[]>(this.resourceUrl + '/banneres/public');
  }

  getPresentation() {
    return this.http.get<any[]>(this.resourceUrl + '/apresentacao-site/public');
  }

  getProgress() {
    return this.http.get<any[]>(this.resourceUrl + '/item-progresso/public');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      console.log('Ocorreu um erro ao tentar realizar a operação');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
