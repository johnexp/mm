import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ApresentacaoSite } from './../domain/apresentacao-site';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApresentacaoSiteService extends GenericService {

  private path = '/apresentacao-site';

  createOrUpdate(apresentacaoSite: ApresentacaoSite): Observable<ApresentacaoSite> {
    if (apresentacaoSite._id) {
      return this.update(apresentacaoSite);
    } else {
      return this.create(apresentacaoSite);
    }
  }

  get(): Observable<ApresentacaoSite> {
    return this.http.get<ApresentacaoSite>(this.path)
      .pipe(catchError(this.handleError<ApresentacaoSite>(new ApresentacaoSite)));
  }

  create(apresentacaoSite: ApresentacaoSite): Observable<ApresentacaoSite> {
    return this.http.post<ApresentacaoSite>(this.path, apresentacaoSite)
      .pipe(catchError(this.handleError<ApresentacaoSite>()));
  }

  update(apresentacaoSite: ApresentacaoSite): Observable<ApresentacaoSite> {
    return this.http.put<ApresentacaoSite>(this.path, apresentacaoSite)
      .pipe(catchError(this.handleError<ApresentacaoSite>()));
  }
}
