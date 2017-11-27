import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Wiki } from './../domain/wiki';
import { catchError } from 'rxjs/operators';

@Injectable()
export class WikiService extends GenericService {

  private path = '/wikis';

  createOrUpdate(wiki: Wiki): Observable<Wiki> {
    if (wiki._id) {
      return this.update(wiki);
    } else {
      return this.create(wiki);
    }
  }

  getAll(): Observable<Wiki[]> {
    return this.http.get<Wiki[]>(this.path);
  }

  get(id: string): Observable<Wiki> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Wiki>(url);
  }

  create(wiki: Wiki): Observable<Wiki> {
    return this.http.post<Wiki>(this.path, wiki);
  }

  update(wiki: Wiki): Observable<Wiki> {
    return this.http.put<Wiki>(this.path, wiki);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
