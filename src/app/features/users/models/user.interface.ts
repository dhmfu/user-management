import { UserType } from '../enums/user-type.enum';

export interface User {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  type: UserType | null;
  password: string | null;
  repeatPassword: string | null;
}