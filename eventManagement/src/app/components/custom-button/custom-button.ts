import { Component, input, output } from '@angular/core';
import { ButtonType, ButtonStyle } from '../../enums/button.enum';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.html',
})
export class CustomButton {
  buttonType = input<ButtonType>(ButtonType.BUTTON);
  style = input<ButtonStyle>(ButtonStyle.PRIMARY);
  tirggerCallBack = output<void>();
  isDisabled = input<boolean>(false);

  readonly ButtonType = ButtonType;

  onClick(): void {
    if (this.isDisabled()) return;
    this.tirggerCallBack.emit();
  }
}
