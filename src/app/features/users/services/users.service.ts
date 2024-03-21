import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { mockUsers } from '../mocks/mockUsers';
import { UserFormData } from '../models/user-form-data.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private fetchTrigger$ = new BehaviorSubject<void>(undefined);

  private users = [...mockUsers];

  constructor() { }

  checkUsernameTaken(username: string): Observable<boolean> {
    return this.fetchUsers().pipe(
      map(users => !!users.find(user => user.username === username))
    );
  }

  createUser(userData: UserFormData): Observable<User> {
    return of(userData).pipe(
      delay(1500),
      map(userData => {
        const { repeatPassword, ...user } = userData;

        return user;
      }),
      tap(user => {
        this.users = [...this.users, user];
      })
    );
  }

  deleteUser(deletedUser: User): Observable<void> {
    return of(undefined).pipe(
      delay(1500),
      tap(() => {
        this.users = this.users.filter(user => user !== deletedUser);
      })
    );
  }

  editUser(userData: UserFormData, editedUser: User): Observable<User> {
    return of(userData).pipe(
      delay(1500),
      map(({ repeatPassword, ...user }) => ({ ...editedUser, ...user })),
      tap(user => {
        this.users = this.users.map(dbUser => {
          if (dbUser === editedUser) {
            return user;
          }

          return dbUser;
        })
      })
    )
  }

  getUsers(): Observable<User[]> {
    return this.fetchTrigger$.asObservable().pipe(
      switchMap(() => this.fetchUsers())
    );
  }

  reloadUsers(): void {
    this.fetchTrigger$.next();
  }

  private fetchUsers(): Observable<User[]> {
    return of([...this.users]).pipe(delay(2000));
  }
}
