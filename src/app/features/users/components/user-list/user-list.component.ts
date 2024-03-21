import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../models/user.interface';
import { UsersService } from '../../services/users.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;

  loadingUsers = true;

  readonly columns: (keyof User)[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'type'
  ];

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers().pipe(
      tap(() => this.loadingUsers = false)
    );
  }

  onCreateUser(): void {
    this.openUserDialog(null);
  }

  onUserClick(user: User): void {
    this.openUserDialog(user);
  }

  private openUserDialog(user: User | null): void {
    const dialogRef = this.dialog.open<UserFormComponent, User | null, boolean>(
      UserFormComponent,
      {
        width: '500px',
        autoFocus: false,
        data: user
      }
    );

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.loadingUsers = true;

        this.usersService.reloadUsers();
      }
    });
  }
}
