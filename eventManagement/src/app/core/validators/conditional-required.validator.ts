import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function conditionalRequiredValidator(
  predicate: (control: AbstractControl) => boolean,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!predicate(control)) {
      return null;
    }

    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return { required: true };
    }

    return null;
  };
}
