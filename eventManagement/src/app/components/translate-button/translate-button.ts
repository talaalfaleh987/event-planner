import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../service/language-service';
import { Language } from '../../enums/language';
import { CustomButton } from '../custom-button/custom-button';

@Component({
  selector: 'app-translate-button',
  imports: [TranslatePipe , CustomButton],
  templateUrl: './translate-button.html',
})
export class TranslateButton {
  private translate = inject(TranslateService);
  languageService = inject(LanguageService);

  Language = Language;

  constructor() {
    this.translate.setFallbackLang(Language.ARABIC);
    this.translate.use(Language.ARABIC);
  }

  toggleLanguage() {
    this.languageService.changeLanguage();
  }
}
