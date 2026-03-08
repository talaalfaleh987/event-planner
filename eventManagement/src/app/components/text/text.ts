import { Component, input } from '@angular/core';
import { TypographyStyle } from '../../enums/typography.enum';

@Component({
  selector: 'app-text',
  imports: [],
  templateUrl: './text.html',
})
export class Text {
  style = input<TypographyStyle>(TypographyStyle.TITLE2);
  text = input<string>('');
}
