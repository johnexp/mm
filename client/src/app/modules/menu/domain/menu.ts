
export class Menu {
  _id: string;
  label: String;
  externo: Boolean = false;
  endereco: String;
  ordem: Number;
  submenus: Menu[] = [];

  constructor() {
  }
}
