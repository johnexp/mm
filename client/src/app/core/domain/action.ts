
export class Action {
  _id: number;
  actionName: String;
  actions: Action[] = [];

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
