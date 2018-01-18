import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Menu } from './../domain/menu';

@Injectable()
export class MenuService extends GenericService {

  private path = '/menu';

  createOrUpdate(menu: Menu): Observable<Menu> {
    if (menu._id) {
      return this.update(menu);
    } else {
      return this.create(menu);
    }
  }

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.path);
  }

  get(id: string): Observable<Menu> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Menu>(url);
  }

  create(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.path, menu);
  }

  update(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(this.path, menu);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
