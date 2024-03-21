import { UserType } from '../enums/user-type.enum';
import { User } from '../models/user.interface';

export const mockUsers: User[] = [
  {
    username: 'admin1',
    firstName: 'Admin',
    lastName: 'One',
    email: 'admin@one',
    type: UserType.Admin,
    password: 'qwert1ui'
  },
  {
    username: 'admin2',
    firstName: 'Admin',
    lastName: 'Two',
    email: 'admin@two',
    type: UserType.Admin,
    password: 'qwert2ui'
  },
  {
    username: 'driver1',
    firstName: 'Driver',
    lastName: 'One',
    email: 'driver@one',
    type: UserType.Driver,
    password: 'qwerty1i'
  },
  {
    username: 'driver2',
    firstName: 'Driver',
    lastName: 'Two',
    email: 'driver@two',
    type: UserType.Driver,
    password: 'qwerty2i'
  }
];