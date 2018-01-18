import { GenericService } from './generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Param } from './../domain/param';

@Injectable()
export class ParamService extends GenericService {

  private path = '/param';

  createOrUpdate(param: Param): Observable<Param> {
    if (param._id) {
      return this.update(param);
    } else {
      return this.create(param);
    }
  }

  getAll(actives?: Boolean): Observable<Param[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Param[]>(path);
  }

  get(id: string): Observable<Param> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Param>(url);
  }

  create(param: Param): Observable<Param> {
    return this.http.post<Param>(this.path, param);
  }

  update(param: Param): Observable<Param> {
    return this.http.put<Param>(this.path, param);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
