import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomButton } from '../../components/custom-button/custom-button';
import { Card } from '../../components/card/card';
import { CustomInput } from '../../components/input/input';
import { InputType, ValidatorType } from '../../enums/input.enum';
import { TranslateButton } from '../../components/translate-button/translate-button';
import { Message } from '../../components/message/message';
import { Router } from '@angular/router';
import { REGEX, Constants } from '../../core/constants';
import { RouterPath } from '../../core/router-paths';
import { InputErrorMessage } from '../../models/input-error-message';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    CustomButton,
    Card,
    CustomInput,
    ReactiveFormsModule,
    TranslateButton,
    Message,
  ],
  templateUrl: './login.html',
})
export class Login {
  submitted = signal(false);

  router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly InputType = InputType;
  readonly ButtonType = ButtonType;
  readonly ButtonStyle = ButtonStyle;

  userForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX.NUMBERS)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(Constants.PASSWORD_MIN_LENGTH)],
    }),
  });

  usernameErrors: InputErrorMessage[] = [
    { message: 'ERRORS.USERNAME_REQUIRED', types: [ValidatorType.required] },
    { message: 'ERRORS.USERNAME_PATTERN', types: [ValidatorType.pattern] },
  ];

  passwordErrors: InputErrorMessage[] = [
    { message: 'ERRORS.PASSWORD_REQUIRED', types: [ValidatorType.required] },
    { message: 'ERRORS.PASSWORD_MIN_LENGTH', types: [ValidatorType.minlength] },
  ];

  onSubmit(): void {
    this.submitted.set(true);
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;
    const username = this.userForm.value.username ?? '';
    this.authService.login(username);
    void this.router.navigateByUrl(RouterPath.Pages.HOME);
  }
}
