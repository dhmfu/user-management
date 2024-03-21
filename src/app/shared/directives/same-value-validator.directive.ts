import { Directive, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appSameValueValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameValueValidatorDirective,
      multi: true
    }
  ]
})
export class SameValueValidatorDirective implements Validator, OnDestroy {
  @Input('appSameValueValidator') otherControl!: AbstractControl;

  private subscription!: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value !== this.otherControl.value) {
      return { valueMismatch: true };
    }

    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.subscription = this.otherControl.valueChanges.subscribe(() => {
      fn();
    });
  }

}
