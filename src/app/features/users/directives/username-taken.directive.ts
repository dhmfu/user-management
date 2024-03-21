import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
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
  @Input('appUsernameTaken') exclusion?: string;

  constructor(private usersService: UsersService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value === this.exclusion) {
      return of(null);
    }

    return this.usersService.checkUsernameTaken(control.value).pipe(
      map(taken => taken ? { usernameTaken: true } : null)
    );
  }

}
