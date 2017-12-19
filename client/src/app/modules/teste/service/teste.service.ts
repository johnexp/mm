import { AppSettings } from './../../../app.settings';
import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Teste } from './../domain/teste';

@Injectable()
export class TesteService extends GenericService {

  private path = '/testes';

  createOrUpdate(formData: FormData, callback?) {
    if (formData.get('_id')) {
      return this.update(formData, callback);
    } else {
      return this.create(formData, callback);
    }
  }

  getAll(actives?: Boolean): Observable<Teste[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Teste[]>(path);
  }

  get(id: string): Observable<Teste> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Teste>(url);
  }

  getEnum(field: string): Observable<string[]> {
    const url = `${this.path}/enum/${field}`;
    return this.http.get<string[]>(url);
  }

  create(formData: FormData, callback?) {
    this.sendFormData(formData, 'POST', callback);
  }

  update(formData: FormData, callback?) {
    this.sendFormData(formData, 'PUT', callback);
  }

  sendFormData(formData: FormData, action: string, callback?) {
    const req = new XMLHttpRequest();
    req.open(action, AppSettings.API_ENDPOINT + this.path);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    req.setRequestHeader('Authorization', 'Bearer ' + currentUser.token);
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE && callback) {
        if (req.status === 200 || req.status === 201) {
          callback(req.response);
        } else {
          callback(null);
        }
      }
    };
    req.send(formData);
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url);
  }
}
