
export class Action {
  _id: string;
  actionName: string;
  actions: Action[] = [];

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
