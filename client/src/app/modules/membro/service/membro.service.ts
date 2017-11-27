import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Membro } from './../domain/membro';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MembroService extends GenericService {

  private path = '/membros';

  createOrUpdate(membro: Membro): Observable<Membro> {
    if (membro._id) {
      return this.update(membro);
    } else {
      return this.create(membro);
    }
  }

  getAll(): Observable<Membro[]> {
    return this.http.get<Membro[]>(this.path);
  }

  get(id: string): Observable<Membro> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Membro>(url)
      .pipe(catchError(this.handleError<Membro>(new Membro)));
  }

  create(membro: Membro): Observable<Membro> {
    return this.http.post<Membro>(this.path, membro)
      .pipe(catchError(this.handleError<Membro>()));
  }

  update(membro: Membro): Observable<Membro> {
    return this.http.put<Membro>(this.path, membro)
      .pipe(catchError(this.handleError<Membro>()));
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError<Membro>()));
  }
}
