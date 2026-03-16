import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputType, ValidatorType } from '../../enums/input.enum';
import { InputErrorMessage } from '../../models/input-error-message';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './input.html',
})
export class CustomInput {
  control = input.required<FormControl>();
  inputType = input<InputType>(InputType.TEXT);
  label = input<string>('');
  errors = input<InputErrorMessage[]>([]);

  get hasError(): boolean {
    const control = this.control();
    return !!(control && control.invalid && control.touched);
  }

  hasErrorByType(validatorTypes: ValidatorType[]): boolean {
    const control = this.control();
    if (!control?.errors) return false;
    for (const validatorType of validatorTypes) {
      if (control.errors?.[validatorType]) {
        return this.hasError;
      }
    }
    return false;
  }
}
