import { User } from './user.interface';

export interface UserFormData extends User {
  repeatPassword: string | null;
}