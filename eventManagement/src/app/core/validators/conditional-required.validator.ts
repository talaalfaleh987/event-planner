import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function conditionalRequiredValidator(
  siblingKey: string,
  requiredWhenValue: unknown,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const siblingValue = control.parent?.get(siblingKey)?.value;
    const isEmpty = control.value === null || control.value === undefined || control.value === '';
    return siblingValue === requiredWhenValue && isEmpty ? { required: true } : null;
  };
}
