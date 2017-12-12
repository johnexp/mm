import { Action } from './action';
import { Module } from './module';

export class Permission {
  _id: number;
  action: Action = new Action;
  module: Module = new Module;
  stringfied: String;

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
