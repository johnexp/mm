import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Arquivo } from './../domain/arquivo';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ArquivoService extends GenericService {

  private path = '/arquivos';

  createOrUpdate(arquivo: Arquivo): Observable<Arquivo> {
    if (arquivo._id) {
      return this.update(arquivo);
    } else {
      return this.create(arquivo);
    }
  }

  getAll(): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(this.path);
  }

  get(id: string): Observable<Arquivo> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Arquivo>(url);
  }

  create(arquivo: Arquivo): Observable<Arquivo> {
    return this.http.post<Arquivo>(this.path, arquivo);
  }

  update(arquivo: Arquivo): Observable<Arquivo> {
    return this.http.put<Arquivo>(this.path, arquivo);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
