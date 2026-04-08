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
  isDisabled = input<boolean>(false);

  triggerCallback = output<MouseEvent>();

  readonly ButtonType = ButtonType;

  onClick(event: MouseEvent): void {
    if (this.isDisabled()) return;
    this.triggerCallback.emit(event);
  }
}
