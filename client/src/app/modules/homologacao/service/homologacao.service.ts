import { Pagination } from './../../../core/domain/pagination';
import { AppSettings } from './../../../app.settings';
import { Http, RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict, ResourceResult } from 'ngx-resource/src/Interfaces';
import { Homologacao } from './../domain/homologacao';

@Injectable()
@ResourceParams({
  url: AppSettings.API_ENDPOINT + '/homologacaos',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class HomologacaoService extends Resource {

  @ResourceAction({
    isArray: true
  })
  getAll: ResourceMethod<{}, Homologacao[]>;

  @ResourceAction({
    path: '/id/{!id}'
  })
  get: ResourceMethod<{ id: string }, Homologacao>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<Homologacao, Homologacao>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  update: ResourceMethod<Homologacao, Homologacao>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: string }, Boolean>;

  constructor(http: Http) {
    super(http);
  }

  createOrUpdate(homologacao: Homologacao, callback?: (res: Homologacao) => any): ResourceResult<Homologacao> {
    if (homologacao._id) {
      return this.update(homologacao, callback);
    } else {
      return this.create(homologacao, callback);
    }
  }
}
