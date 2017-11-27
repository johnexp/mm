import { CustomSnackBarService } from './../util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../domain/pagination';
import { AppSettings } from './../../app.settings';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class GenericService {

  resourceUrl = AppSettings.API_ENDPOINT;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'authorization': 'Bearer ' + this.authenticationService.getAuthorization()
    })
  };

  constructor(public http: HttpClient,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBarService) { }

  getResourceUrl(path: string) {
    return this.resourceUrl + '/' + path;
  }

  filterGeneric(body: any, resource: string, sort?: string, order?: string, page?: number, limit?: number): Observable<Pagination> {
    const url = `${this.resourceUrl}/${resource}/filter/?sort=${sort}&order=${order}&page=${page}&limit=${limit}`;
    return this.http.post<Pagination>(url, body, this.httpOptions).pipe(catchError(this.handleError<Pagination>()));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      this.snackBar.open('Ocorreu um erro ao tentar realizar a operação', 'danger');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
