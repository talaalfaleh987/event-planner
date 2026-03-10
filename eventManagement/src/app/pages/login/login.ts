import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomButton } from '../../components/custom-button/custom-button';
import { Card } from '../../components/card/card';
import { CustomInput } from '../../components/input/input';
import { InputType } from '../../enums/input.enum';
import { TranslateButton } from '../../components/translate-button/translate-button';
import { Message } from '../../components/message/message';

@Component({
  selector: 'app-login',
  imports: [TranslatePipe , CustomButton, Card , CustomInput, ReactiveFormsModule, TranslateButton, Message],
  templateUrl: './login.html',
})
export class Login {
  readonly ButtonType = ButtonType;
  readonly InputType = InputType;
  readonly ButtonStyle = ButtonStyle;
  
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', { validators: [Validators.required]}),
    password: new FormControl('', { validators: [Validators.required] }),
  })

  get usernameControl(): FormControl {
  return this.userForm.get('username')! as FormControl;
}

get passwordControl(): FormControl {
  return this.userForm.get('password')! as FormControl;
}
}
