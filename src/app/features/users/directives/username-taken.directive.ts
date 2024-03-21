import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

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
  constructor() { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(null).pipe(delay(2000));
  }

}
