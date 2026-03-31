import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputType, ValidatorType } from '../../enums/input.enum';
import { InputErrorMessage } from '../../models/input-error-message';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './input.html',
})
export class CustomInput {
  private readonly formGroupDirective = inject(FormGroupDirective);

  controlName = input.required<string>();
  inputType = input<InputType>(InputType.TEXT);
  label = input<string>('');
  errors = input<InputErrorMessage[]>([]);
  maxLength = input<number>();
  showRequiredStar = input<boolean>(false);
  isReadonly = input<boolean>(false);
  displayValue = input<string>('');

  protected control(): FormControl {
    return this.formGroupDirective.form.get(this.controlName()) as FormControl;
  }

  get hasError(): boolean {
    const control = this.control();
    return !!(control && control.invalid && control.touched);
  }

  hasErrorByType(validatorTypes: ValidatorType[]): boolean {
    const control = this.control();

    if (!control?.errors) {
      return false;
    }

    for (const validatorType of validatorTypes) {
      if (control.errors?.[validatorType]) {
        return this.hasError;
      }
    }

    return false;
  }
}
