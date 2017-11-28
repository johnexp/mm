import { AuthenticationService } from './../../../core/service/authentication.service';
import { AppSettings } from './../../../app.settings';
import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Arquivo } from './../domain/arquivo';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ArquivoService extends GenericService {

  private path = '/arquivos';

  createOrUpdate(formData: FormData, callback?) {
    if (formData.get('_id')) {
      return this.update(formData, callback);
    } else {
      return this.create(formData, callback);
    }
  }

  getAll(): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(this.path);
  }

  get(id: string): Observable<Arquivo> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Arquivo>(url);
  }

  create(formData: FormData, callback?) {
    const req = new XMLHttpRequest();
    req.open('POST', AppSettings.API_ENDPOINT + this.path);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    req.setRequestHeader('Authorization', 'Bearer ' + currentUser.token);
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 201) {
          callback(req.response);
        } else {
          callback(null);
        }
      }
    };
    req.send(formData);
  }

  update(formData: FormData, callback?) {
    const req = new XMLHttpRequest();
    req.open('PUT', AppSettings.API_ENDPOINT + this.path);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    req.setRequestHeader('Authorization', 'Bearer ' + currentUser.token);
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
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
