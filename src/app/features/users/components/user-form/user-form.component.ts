import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserType } from '../../enums/user-type.enum';
import { UserFormData } from '../../models/user-form-data.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title = 'Create new user';

  user!: UserFormData;

  isNewUser = true;

  saving = false;

  readonly types: UserType[] = [UserType.Admin, UserType.Driver];

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.user = this.createBlankUser();
  }

  onSubmit(): void {
    this.saving = true;

    this.usersService.createUser(this.user).subscribe(result => {
      this.dialogRef.close(true);
    });
  }

  private createBlankUser(): UserFormData {
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
