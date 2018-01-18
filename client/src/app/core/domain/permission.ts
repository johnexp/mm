import { Action } from './action';
import { Module } from './module';

export class Permission {
  _id: string;
  action: Action = new Action;
  actions: Action[] = [];
  module: Module = new Module;
  stringfied: string;
  prettified: string;

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
