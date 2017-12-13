import { Permission } from './permission';

export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  roles: string[];
  permissions: Permission[] = [];
  active: Boolean = true;
}
