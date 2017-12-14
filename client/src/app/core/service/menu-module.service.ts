import { GenericService } from './generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { MenuModule } from './../domain/menu-module';

@Injectable()
export class MenuModuleService extends GenericService {

  private path = '/menu-module';

  createOrUpdate(menuModule: MenuModule): Observable<MenuModule> {
    if (menuModule._id) {
      return this.update(menuModule);
    } else {
      return this.create(menuModule);
    }
  }

  getAll(): Observable<MenuModule[]> {
    return this.http.get<MenuModule[]>(this.path);
  }

  get(id: string): Observable<MenuModule> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<MenuModule>(url);
  }

  getByName(name: string): Observable<any[]> {
    const url = `${this.path}/name/${name}`;
    return this.http.get<any[]>(url);
  }

  getModules(): Observable<MenuModule[]> {
    const url = `${this.path}/modules`;
    return this.http.get<MenuModule[]>(url);
  }

  create(menuModule: MenuModule): Observable<MenuModule> {
    return this.http.post<MenuModule>(this.path, menuModule);
  }

  update(menuModule: MenuModule): Observable<MenuModule> {
    return this.http.put<MenuModule>(this.path, menuModule);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }

  getEnum(field: string): Observable<string[]> {
    const url = `${this.path}/enum/${field}`;
    return this.http.get<string[]>(url);
  }
}
