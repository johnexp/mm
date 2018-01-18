import { Role } from './role';
import { Permission } from './permission';

export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  roles: Role[] = [];
  permissions: Permission[] = [];
  ativo: Boolean = true;
}
