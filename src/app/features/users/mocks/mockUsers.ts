import { UserType } from '../enums/user-type.enum';
import { User } from '../models/user.interface';

export const mockUsers: User[] = [
  {
    username: 'admin1',
    firstName: 'Admin',
    lastName: 'One',
    email: 'admin@one',
    type: UserType.Admin,
    password: 'qwert1ui',
    repeatPassword: 'qwert1ui'
  }
];