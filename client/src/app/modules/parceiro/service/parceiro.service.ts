import { AppSettings } from './../../../app.settings';
import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Parceiro } from './../domain/parceiro';

@Injectable()
export class ParceiroService extends GenericService {

  private path = '/parceiros';

  createOrUpdate(formData: FormData, callback?) {
    if (formData.get('_id')) {
      return this.update(formData, callback);
    } else {
      return this.create(formData, callback);
    }
  }

  getAll(actives?: Boolean): Observable<Parceiro[]> {
    let path = this.path;
    if (actives != null && actives !== undefined) {
      path += '/' + actives;
    }
    return this.http.get<Parceiro[]>(path);
  }

  get(id: string): Observable<Parceiro> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Parceiro>(url);
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
          callback({ error: JSON.parse(req.response).message });
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
