import { Pagination } from './../../../core/domain/pagination';
import { AppSettings } from './../../../app.settings';
import { Http, RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict, ResourceResult } from 'ngx-resource/src/Interfaces';
import { Membro } from './../domain/membro';

@Injectable()
@ResourceParams({
  url: AppSettings.API_ENDPOINT + '/membros',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class MembroService extends Resource {

  @ResourceAction({
    isArray: true
  })
  getAll: ResourceMethod<{}, Membro[]>;

  @ResourceAction({
    path: '/id/{!id}'
  })
  get: ResourceMethod<{ id: string }, Membro>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<Membro, Membro>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  update: ResourceMethod<Membro, Membro>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: string }, Boolean>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/upload-foto'
  })
  salvarFoto: ResourceMethod<Membro, Membro>;

  constructor(http: Http) {
    super(http);
  }

  createOrUpdate(membro: Membro, callback?: (res: Membro) => any): ResourceResult<Membro> {
    if (membro._id) {
      return this.update(membro, callback);
    } else {
      return this.create(membro, callback);
    }
  }
}
