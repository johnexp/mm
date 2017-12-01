import { Sobre } from './../domain/sobre';
import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SobreService extends GenericService {

  private path = '/sobre';

  createOrUpdate(sobre: Sobre): Observable<Sobre> {
    if (sobre._id) {
      return this.update(sobre);
    } else {
      return this.create(sobre);
    }
  }

  get(): Observable<Sobre> {
    return this.http.get<Sobre>(this.path)
      .pipe(catchError(this.handleError<Sobre>(new Sobre)));
  }

  create(sobre: Sobre): Observable<Sobre> {
    return this.http.post<Sobre>(this.path, sobre)
      .pipe(catchError(this.handleError<Sobre>()));
  }

  update(sobre: Sobre): Observable<Sobre> {
    return this.http.put<Sobre>(this.path, sobre)
      .pipe(catchError(this.handleError<Sobre>()));
  }
}
