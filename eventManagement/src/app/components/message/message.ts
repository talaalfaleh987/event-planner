import { Component, input } from '@angular/core';
import { MessageStyle } from '../../enums/message.enum';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
})
export class Message {
  textMessage = input.required<string>();
  messageStyle = input<MessageStyle>(MessageStyle.ERROR);
}
