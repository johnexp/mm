import { Menu } from './menu';

export class MenuModule {
  _id: string;
  name: string;
  label: string;
  menus: Menu[] = [];
  roles: string[];

  constructor() {
  }
}
