import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ItemAreaCliente } from './../domain/item-area-cliente';

@Injectable()
export class ItemAreaClienteService extends GenericService {

  private path = '/item-area-cliente';

  createOrUpdate(itemAreaCliente: ItemAreaCliente): Observable<ItemAreaCliente> {
    if (itemAreaCliente._id) {
      return this.update(itemAreaCliente);
    } else {
      return this.create(itemAreaCliente);
    }
  }

  getAll(actives?: Boolean): Observable<ItemAreaCliente[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<ItemAreaCliente[]>(path);
  }

  get(id: string): Observable<ItemAreaCliente> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<ItemAreaCliente>(url);
  }

  getEnum(field: string): Observable<string[]> {
    const url = `${this.path}/enum/${field}`;
    return this.http.get<string[]>(url);
  }

  create(itemAreaCliente: ItemAreaCliente): Observable<ItemAreaCliente> {
    return this.http.post<ItemAreaCliente>(this.path, itemAreaCliente);
  }

  update(itemAreaCliente: ItemAreaCliente): Observable<ItemAreaCliente> {
    return this.http.put<ItemAreaCliente>(this.path, itemAreaCliente);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
