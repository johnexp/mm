import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ItemProgresso } from './../domain/item-progresso';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ItemProgressoService extends GenericService {

  private path = '/item-progresso';

  createOrUpdate(itemProgresso: ItemProgresso): Observable<ItemProgresso> {
    if (itemProgresso._id) {
      return this.update(itemProgresso);
    } else {
      return this.create(itemProgresso);
    }
  }

  getAll(): Observable<ItemProgresso[]> {
    return this.http.get<ItemProgresso[]>(this.path);
  }

  get(id: string): Observable<ItemProgresso> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<ItemProgresso>(url)
      .pipe(catchError(this.handleError<ItemProgresso>(new ItemProgresso)));
  }

  create(itemProgresso: ItemProgresso): Observable<ItemProgresso> {
    return this.http.post<ItemProgresso>(this.path, itemProgresso)
      .pipe(catchError(this.handleError<ItemProgresso>()));
  }

  update(itemProgresso: ItemProgresso): Observable<ItemProgresso> {
    return this.http.put<ItemProgresso>(this.path, itemProgresso)
      .pipe(catchError(this.handleError<ItemProgresso>()));
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError<ItemProgresso>()));
  }
}
