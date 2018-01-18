import { GenericService } from './generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Role } from './../domain/role';

@Injectable()
export class RoleService extends GenericService {

  private path = '/role';

  createOrUpdate(role: Role): Observable<Role> {
    if (role._id) {
      return this.update(role);
    } else {
      return this.create(role);
    }
  }

  getAll(actives?: Boolean): Observable<Role[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Role[]>(path);
  }

  get(id: string): Observable<Role> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Role>(url);
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.path, role);
  }

  update(role: Role): Observable<Role> {
    return this.http.put<Role>(this.path, role);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
