import { GenericService } from './../../../core/service/generic.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Pagina } from './../domain/pagina';

@Injectable()
export class PaginaService extends GenericService {

  private path = '/pagina';

  createOrUpdate(pagina: Pagina, tipoPagina: string): Observable<Pagina> {
    if (pagina._id) {
      return this.update(pagina, tipoPagina);
    } else {
      return this.create(pagina, tipoPagina);
    }
  }

  getByPagina(pagina: string): Observable<Pagina> {
    return this.http.get<Pagina>(this.path + '/' + pagina + '/pagina/' + pagina);
  }

  create(pagina: Pagina, tipoPagina: string): Observable<Pagina> {
    return this.http.post<Pagina>(this.path + '/' + tipoPagina, pagina);
  }

  update(pagina: Pagina, tipoPagina: string): Observable<Pagina> {
    return this.http.put<Pagina>(this.path + '/' + tipoPagina, pagina);
  }

}
