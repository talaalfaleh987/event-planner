import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../service/language-service';
import { Language } from '../../enums/language.enum';
import { CustomButton } from '../custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';

@Component({
  selector: 'app-translate-button',
  imports: [TranslatePipe , CustomButton],
  templateUrl: './translate-button.html',
})
export class TranslateButton {
  private readonly languageService = inject(LanguageService);

  readonly Language = Language;
  readonly ButtonStyle = ButtonStyle;

  toggleLanguage() {
    this.languageService.changeLanguage();
  }
}
