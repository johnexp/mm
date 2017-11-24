import { Pagination } from './../../../core/domain/pagination';
import { AppSettings } from './../../../app.settings';
import { Http, RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict, ResourceResult } from 'ngx-resource/src/Interfaces';
import { Banner } from './../domain/banner';

@Injectable()
@ResourceParams({
  url: AppSettings.API_ENDPOINT + '/banneres',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class BannerService extends Resource {

  @ResourceAction({
    isArray: true
  })
  getAll: ResourceMethod<{}, Banner[]>;

  @ResourceAction({
    path: '/id/{!id}'
  })
  get: ResourceMethod<{ id: string }, Banner>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  create: ResourceMethod<Banner, Banner>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  update: ResourceMethod<Banner, Banner>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: string }, Boolean>;

  constructor(http: Http) {
    super(http);
  }

  createOrUpdate(banner: Banner, callback?: (res: Banner) => any): ResourceResult<Banner> {
    if (banner._id) {
      return this.update(banner, callback);
    } else {
      return this.create(banner, callback);
    }
  }
}
