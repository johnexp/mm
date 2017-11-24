import { Pagination } from './../../../core/domain/pagination';
import { AppSettings } from './../../../app.settings';
import { Http, RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict, ResourceResult } from 'ngx-resource/src/Interfaces';
import { ApresentacaoSite } from './../domain/apresentacao-site';

@Injectable()
@ResourceParams({
  url: AppSettings.API_ENDPOINT + '/apresentacao-site',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class ApresentacaoSiteService extends Resource {

  @ResourceAction({
    isArray: true
  })
  getAll: ResourceMethod<{}, ApresentacaoSite[]>;

  @ResourceAction()
  get: ResourceMethod<{}, ApresentacaoSite>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<ApresentacaoSite, ApresentacaoSite>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  update: ResourceMethod<ApresentacaoSite, ApresentacaoSite>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: string }, Boolean>;

  constructor(http: Http) {
    super(http);
  }

  createOrUpdate(apresentacaoSite: ApresentacaoSite, callback?: (res: ApresentacaoSite) => any): ResourceResult<ApresentacaoSite> {
    if (apresentacaoSite._id) {
      return this.update(apresentacaoSite, callback);
    } else {
      return this.create(apresentacaoSite, callback);
    }
  }
}
