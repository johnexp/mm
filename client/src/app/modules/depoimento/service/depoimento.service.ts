import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Depoimento } from './../domain/depoimento';

@Injectable()
export class DepoimentoService extends GenericService {

  private path = '/depoimentos';

  createOrUpdate(depoimento: Depoimento): Observable<Depoimento> {
    if (depoimento._id) {
      return this.update(depoimento);
    } else {
      return this.create(depoimento);
    }
  }

  getAll(): Observable<Depoimento[]> {
    return this.http.get<Depoimento[]>(this.path);
  }

  get(id: string): Observable<Depoimento> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Depoimento>(url);
  }

  create(depoimento: Depoimento): Observable<Depoimento> {
    return this.http.post<Depoimento>(this.path, depoimento);
  }

  update(depoimento: Depoimento): Observable<Depoimento> {
    return this.http.put<Depoimento>(this.path, depoimento);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
