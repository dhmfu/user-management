import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


enum UserType {
  Admin = 'Admin',
  Driver = 'Driver'
}

interface User {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  type: UserType | null;
  password: string | null;
  repeatPassword: string | null;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title = 'Create new user';

  user!: User;

  isNewUser = true;

  readonly types: UserType[] = [UserType.Admin, UserType.Driver];

  constructor(private dialogRef: MatDialogRef<UserFormComponent>) { }

  ngOnInit(): void {
    this.user = this.createBlankUser();
  }

  onSubmit(): void {
    this.dialogRef.close(this.user);
  }

  private createBlankUser(): User {
    return {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      type: null,
      password: null,
      repeatPassword: null
    };
  }

}