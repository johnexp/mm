import { GenericService } from './generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from './../domain/action';

@Injectable()
export class ActionService extends GenericService {

  private path = '/action';

  createOrUpdate(action: Action): Observable<Action> {
    if (action._id) {
      return this.update(action);
    } else {
      return this.create(action);
    }
  }

  getAll(actives?: Boolean): Observable<Action[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Action[]>(path);
  }

  get(id: string): Observable<Action> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Action>(url);
  }

  create(action: Action): Observable<Action> {
    return this.http.post<Action>(this.path, action);
  }

  update(action: Action): Observable<Action> {
    return this.http.put<Action>(this.path, action);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
