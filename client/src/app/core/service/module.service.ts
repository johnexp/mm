import { GenericService } from './generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Module } from './../domain/module';

@Injectable()
export class ModuleService extends GenericService {

  private path = '/modules';

  createOrUpdate(module: Module): Observable<Module> {
    if (module._id) {
      return this.update(module);
    } else {
      return this.create(module);
    }
  }

  getAll(actives?: Boolean): Observable<Module[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Module[]>(path);
  }

  get(id: string): Observable<Module> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Module>(url);
  }

  create(module: Module): Observable<Module> {
    return this.http.post<Module>(this.path, module);
  }

  update(module: Module): Observable<Module> {
    return this.http.put<Module>(this.path, module);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
