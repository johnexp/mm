import { Pagination } from './../domain/pagination';
import { AppSettings } from './../../app.settings';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { Injectable, Injector } from '@angular/core';
import { Http, RequestMethod, URLSearchParams } from '@angular/http';
import { ResourceMethod, ResourceMethodStrict } from 'ngx-resource/src/Interfaces';
import { TipoPermissao } from '../domain/tipo-permissao';

@Injectable()
@ResourceParams({
  url: AppSettings.API_ENDPOINT + '/user',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class GenericService extends Resource {

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/permissions',
    isArray: true
  })
  getAllTipoPermissao: ResourceMethod<{}, TipoPermissao[]>;

  @ResourceAction({
    method: RequestMethod.Post,
    url: AppSettings.API_ENDPOINT + '/{resource}/filter',
    path: '/?sort={sort}&order={order}&page={page}&limit={limit}'
  })
  filterGeneric: ResourceMethodStrict<any, { resource: string, sort: string, order: string, page: number, limit: number }, Pagination>;

  constructor(http: Http, injector: Injector) {
    super(http);
  }

}
