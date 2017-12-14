import { Menu } from './menu';

export class MenuModule {
  _id: number;
  name: string;
  label: string;
  menus: Menu[] = [];
  roles: string[];

  constructor() {
  }
}
