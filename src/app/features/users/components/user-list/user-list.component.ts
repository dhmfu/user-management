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
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.loadingUsers = true;

        this.usersService.reloadUsers();
      }
    });
  }

}
