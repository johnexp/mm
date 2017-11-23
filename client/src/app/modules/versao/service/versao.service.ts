import { Pagination } from './../../../core/domain/pagination';
import { Permissao } from './../../../core/domain/permissao';
import { AppSettings } from './../../../app.settings';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { Injectable, Injector } from '@angular/core';
import { Http, RequestMethod, URLSearchParams } from '@angular/http';
import { ResourceMethod, ResourceMethodStrict, ResourceResult } from 'ngx-resource/src/Interfaces';
import { Versao } from '../domain/versao';

@Injectable()
@ResourceParams({
  url: AppSettings.API_ENDPOINT + '/versoes',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class VersaoService extends Resource {

  @ResourceAction({
    isArray: true
  })
  getAll: ResourceMethod<{}, Versao[]>;

  @ResourceAction({
    path: '/id/{!id}'
  })
  get: ResourceMethod<{ id: string }, Versao>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<Versao, Versao>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  update: ResourceMethod<Versao, Versao>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: string }, Boolean>;


  constructor(http: Http, injector: Injector) {
    super(http);
  }

  createOrUpdate(versao: Versao): ResourceResult<Versao> {
    if (versao._id) {
      return this.update(versao);
    } else {
      return this.create(versao);
    }
  }

}
