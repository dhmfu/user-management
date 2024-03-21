import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { delay, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { mockUsers } from '../mocks/mockUsers';
import { User } from '../models/user.interface';
import { UserFormData } from '../models/user-form-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersState$ = new BehaviorSubject<User[]>([]);
  private fetchTrigger$ = new BehaviorSubject<void>(undefined);

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
        mockUsers.push(user);
      })
    );
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
    return of([...mockUsers]).pipe(delay(2000));
  }
}
