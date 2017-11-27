import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Banner } from './../domain/banner';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BannerService extends GenericService {

  private path = '/banneres';

  createOrUpdate(banner: Banner): Observable<Banner> {
    if (banner._id) {
      return this.update(banner);
    } else {
      return this.create(banner);
    }
  }

  getAll(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.path);
  }

  get(id: string): Observable<Banner> {
    const url = `${this.path}/id/${id}`;
    return this.http.get<Banner>(url)
      .pipe(catchError(this.handleError<Banner>(new Banner)));
  }

  create(banner: Banner): Observable<Banner> {
    return this.http.post<Banner>(this.path, banner)
      .pipe(catchError(this.handleError<Banner>()));
  }

  update(banner: Banner): Observable<Banner> {
    return this.http.put<Banner>(this.path, banner)
      .pipe(catchError(this.handleError<Banner>()));
  }

  delete(id: string): Observable<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError<Banner>()));
  }
}
