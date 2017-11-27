import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Versao } from '../domain/versao';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VersaoService extends GenericService {

  private path = '/versoes';

  createOrUpdate(versao: Versao): Observable<Versao> {
    if (versao._id) {
      return this.update(versao);
    } else {
      return this.create(versao);
    }
  }

  getAll(): Observable<Versao[]> {
    return this.http.get<Versao[]>(this.path);
  }

  get(id: string): Observable<Versao> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Versao>(url)
      .pipe(catchError(this.handleError<Versao>(new Versao)));
  }

  create(versao: Versao): Observable<Versao> {
    return this.http.post<Versao>(this.path, versao)
      .pipe(catchError(this.handleError<Versao>()));
  }

  update(versao: Versao): Observable<Versao> {
    return this.http.put<Versao>(this.path, versao)
      .pipe(catchError(this.handleError<Versao>()));
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError<Versao>()));
  }
}
