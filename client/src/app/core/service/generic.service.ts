import { CustomHttp } from './../helpers/custom.http';
import { CustomSnackBarService } from './../util/snack-bar/custom-snack-bar.service';
import { Pagination } from './../domain/pagination';
import { AppSettings } from './../../app.settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class GenericService {

  resourceUrl = AppSettings.API_ENDPOINT;

  constructor(public http: CustomHttp,
    private authenticationService: AuthenticationService,
    private snackBar: CustomSnackBarService) { }

  filterGeneric(body: any, resource: string, sort?: string, order?: string, page?: number, limit?: number): Observable<Pagination> {
    const url = `/${resource}/filter/?sort=${sort}&order=${order}&page=${page}&limit=${limit}`;
    return this.http.post<Pagination>(url, body).pipe(catchError(this.handleError<Pagination>()));
  }

  getAllGeneric(resource: string, active?: boolean): Observable<any[]> {
    let url = `/${resource}`;
    if (active !== undefined) {
      url += `/${active}`;
    }
    return this.http.get<any[]>(url).pipe(catchError(this.handleError<any[]>()));
  }

  uploadImage(uploadPath: string, data: FormData, callback?: (response: any) => void): void {
    let url = `${uploadPath.startsWith('/') ? uploadPath : '/' + uploadPath}`;

    const req = new XMLHttpRequest();
    req.open('POST', AppSettings.API_ENDPOINT + url);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    req.setRequestHeader('Authorization', 'Bearer ' + currentUser.token);
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE && callback) {
        if (req.status === 200 || req.status === 201) {
          callback(req.response);
        } else {
          callback(null);
        }
      }
    };
    req.send(data);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.snackBar.open(error, 'danger');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
