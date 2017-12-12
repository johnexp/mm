import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Teste } from './../domain/teste';

@Injectable()
export class TesteService extends GenericService {

  private path = '/testes';

  createOrUpdate(teste: Teste): Observable<Teste> {
    if (teste._id) {
      return this.update(teste);
    } else {
      return this.create(teste);
    }
  }

  getAll(actives?: Boolean): Observable<Teste[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Teste[]>(path);
  }

  get(id: string): Observable<Teste> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Teste>(url);
  }

  getEnum(field: string): Observable<string[]> {
    const url = `${this.path}/enum/${field}`;
    return this.http.get<string[]>(url);
  }

  create(teste: Teste): Observable<Teste> {
    return this.http.post<Teste>(this.path, teste);
  }

  update(teste: Teste): Observable<Teste> {
    return this.http.put<Teste>(this.path, teste);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
