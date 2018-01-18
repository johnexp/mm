import { AppSettings } from './../../../app.settings';
import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Banner } from './../domain/banner';

@Injectable()
export class BannerService extends GenericService {

  private path = '/banner';

  createOrUpdate(formData: FormData, callback?) {
    if (formData.get('_id')) {
      return this.update(formData, callback);
    } else {
      return this.create(formData, callback);
    }
  }

  getAll(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.path);
  }

  get(id: string): Observable<Banner> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Banner>(url);
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

  changeState(id: string): Observable<any> {
    const url = `${this.path}/change-state/${id}`;
    return this.http.post(url, {});
  }
}
