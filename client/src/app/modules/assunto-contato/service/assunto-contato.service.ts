import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AssuntoContato } from './../domain/assunto-contato';

@Injectable()
export class AssuntoContatoService extends GenericService {

  private path = '/assunto-contato';

  createOrUpdate(assuntoContato: AssuntoContato): Observable<AssuntoContato> {
    if (assuntoContato._id) {
      return this.update(assuntoContato);
    } else {
      return this.create(assuntoContato);
    }
  }

  getAll(): Observable<AssuntoContato[]> {
    return this.http.get<AssuntoContato[]>(this.path);
  }

  get(id: string): Observable<AssuntoContato> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<AssuntoContato>(url);
  }

  create(assuntoContato: AssuntoContato): Observable<AssuntoContato> {
    return this.http.post<AssuntoContato>(this.path, assuntoContato);
  }

  update(assuntoContato: AssuntoContato): Observable<AssuntoContato> {
    return this.http.put<AssuntoContato>(this.path, assuntoContato);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
