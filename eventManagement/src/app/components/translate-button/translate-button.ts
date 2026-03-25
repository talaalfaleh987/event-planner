import { Component, inject, input } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Language } from '../../enums/language.enum';
import { CustomButton } from '../custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';
import { LanguageService } from '../../service/language/language-service';

@Component({
  selector: 'app-translate-button',
  imports: [TranslatePipe , CustomButton],
  templateUrl: './translate-button.html',
})
export class TranslateButton {
  private readonly languageService = inject(LanguageService);

  readonly Language = Language;
  readonly ButtonStyle = ButtonStyle;

  style = input<ButtonStyle>(ButtonStyle.PRIMARY_ICON);

  toggleLanguage() {
    this.languageService.changeLanguage();
  }
}
