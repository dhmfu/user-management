import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserType } from '../../enums/user-type.enum';
import { UserFormData } from '../../models/user-form-data.interface';
import { User } from '../../models/user.interface';
import { UsersService } from '../../services/users.service';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  title = 'Create new user';

  userModel!: UserFormData;
  
  isNewUser = true;
  usernameExclusion?: string;
  deleting = false;
  saving = false;

  readonly types: UserType[] = [UserType.Admin, UserType.Driver];

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) private dialogData: User | null,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    const user = this.dialogData;

    if (!user) {
      this.userModel = this.initiateBlankUser();
    } else {
      this.currentUserInit(user);
    }
  }

  ngOnDestroy(): void {
  }

  onDelete(): void {
    this.deleting = true;

    this.usersService.deleteUser(this.dialogData!).subscribe(() => {

      this.dialogRef.close(true);
    })
  }

  onSubmit(): void {
    this.saving = true;

    if (this.isNewUser) {
      this.createNewUser();
    } else {
      this.editUser();
    }
  }

  private createNewUser(): void {
    this.usersService.createUser(this.userModel).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private editUser(): void {
    this.usersService.editUser(this.userModel, this.dialogData!).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private currentUserInit(user: User): void {
    this.userModel = { ...user, repeatPassword: user.password };
    this.isNewUser = false;
    this.title = `${user.firstName} ${user.lastName}`;
    this.usernameExclusion = user.username!;
  }

  private initiateBlankUser(): UserFormData {
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
