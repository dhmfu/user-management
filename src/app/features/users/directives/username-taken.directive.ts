import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Directive({
  selector: '[appUsernameTaken]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UsernameTakenDirective),
      multi: true
    }
  ]
})
export class UsernameTakenDirective implements AsyncValidator {
  constructor(private usersService: UsersService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.usersService.checkUsernameTaken(control.value).pipe(
      map(taken => taken ? { usernameTaken: true } : null)
    );
  }

}
