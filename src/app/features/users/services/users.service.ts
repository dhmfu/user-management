import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { mockUsers } from '../mocks/mockUsers';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor() { }

  checkUsernameTaken(username: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => !!users.find(user => user.username === username))
    );
  }

  getUsers(): Observable<User[]> {
    return of(mockUsers).pipe(delay(2000));
  }
}
