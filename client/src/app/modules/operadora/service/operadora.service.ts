import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Operadora } from './../domain/operadora';

@Injectable()
export class OperadoraService extends GenericService {

  private path = '/operadoras';

  createOrUpdate(operadora: Operadora): Observable<Operadora> {
    if (operadora._id) {
      return this.update(operadora);
    } else {
      return this.create(operadora);
    }
  }

  getAll(actives?: Boolean): Observable<Operadora[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Operadora[]>(path);
  }

  get(id: string): Observable<Operadora> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Operadora>(url);
  }

  create(operadora: Operadora): Observable<Operadora> {
    return this.http.post<Operadora>(this.path, operadora);
  }

  update(operadora: Operadora): Observable<Operadora> {
    return this.http.put<Operadora>(this.path, operadora);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
