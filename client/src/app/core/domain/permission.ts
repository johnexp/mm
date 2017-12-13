import { Action } from './action';
import { Module } from './module';

export class Permission {
  _id: number;
  action: Action = new Action;
  module: Module = new Module;
  stringfied: String;
  prettified: String;

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
