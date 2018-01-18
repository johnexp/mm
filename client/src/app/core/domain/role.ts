import { Permission } from './permission';

export class Role {
  _id: string;
  roleName: string;
  roleKey: string;
  permissions: Permission[] = [];
  isAdmin: boolean;
  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
