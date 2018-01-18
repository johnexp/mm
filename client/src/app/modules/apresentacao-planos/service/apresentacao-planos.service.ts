import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ApresentacaoPlanos } from './../domain/apresentacao-planos';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApresentacaoPlanosService extends GenericService {

  private path = '/apresentacao-planos';

  createOrUpdate(apresentacaoPlanos: ApresentacaoPlanos): Observable<ApresentacaoPlanos> {
    if (apresentacaoPlanos._id) {
      return this.update(apresentacaoPlanos);
    } else {
      return this.create(apresentacaoPlanos);
    }
  }

  get(): Observable<ApresentacaoPlanos> {
    return this.http.get<ApresentacaoPlanos>(this.path)
      .pipe(catchError(this.handleError<ApresentacaoPlanos>(new ApresentacaoPlanos)));
  }

  create(apresentacaoPlanos: ApresentacaoPlanos): Observable<ApresentacaoPlanos> {
    return this.http.post<ApresentacaoPlanos>(this.path, apresentacaoPlanos)
      .pipe(catchError(this.handleError<ApresentacaoPlanos>()));
  }

  update(apresentacaoPlanos: ApresentacaoPlanos): Observable<ApresentacaoPlanos> {
    return this.http.put<ApresentacaoPlanos>(this.path, apresentacaoPlanos)
      .pipe(catchError(this.handleError<ApresentacaoPlanos>()));
  }
}
