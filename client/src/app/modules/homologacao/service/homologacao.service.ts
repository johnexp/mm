import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Homologacao } from './../domain/homologacao';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HomologacaoService extends GenericService {

  private path = '/homologacaos';

  createOrUpdate(homologacao: Homologacao): Observable<Homologacao> {
    if (homologacao._id) {
      return this.update(homologacao);
    } else {
      return this.create(homologacao);
    }
  }

  getAll(): Observable<Homologacao[]> {
    return this.http.get<Homologacao[]>(this.path);
  }

  get(id: string): Observable<Homologacao> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Homologacao>(url)
      .pipe(catchError(this.handleError<Homologacao>(new Homologacao)));
  }

  create(homologacao: Homologacao): Observable<Homologacao> {
    return this.http.post<Homologacao>(this.path, homologacao)
      .pipe(catchError(this.handleError<Homologacao>()));
  }

  update(homologacao: Homologacao): Observable<Homologacao> {
    return this.http.put<Homologacao>(this.path, homologacao)
      .pipe(catchError(this.handleError<Homologacao>()));
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError<Homologacao>()));
  }
}
