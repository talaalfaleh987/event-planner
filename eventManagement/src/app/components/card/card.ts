import { Component, input } from '@angular/core';
import { CardStyle } from '../../enums/card.enum';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
})
export class Card {
  hasBorder = input<boolean>(true);
  style = input<CardStyle>(CardStyle.LOGIN);
}
