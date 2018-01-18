import { GenericService } from './generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Permission } from './../domain/permission';

@Injectable()
export class PermissionService extends GenericService {

  private path = '/permission';

  createOrUpdate(permission: Permission): Observable<Permission> {
    if (permission._id) {
      return this.update(permission);
    } else {
      return this.create(permission);
    }
  }

  getAll(actives?: Boolean): Observable<Permission[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Permission[]>(path);
  }

  get(id: string): Observable<Permission> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Permission>(url);
  }

  create(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.path, permission);
  }

  update(permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(this.path, permission);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
