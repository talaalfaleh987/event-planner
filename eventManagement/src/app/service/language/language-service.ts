import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../enums/language.enum';


@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translate = inject(TranslateService);

  setLanguage(language: Language): void {
    this.translate.use(language);
    document.documentElement.setAttribute('lang', language);
  }
  getLanguage(): Language {
    return this.translate.getCurrentLang() as Language;
  }
  isArabic(): boolean {
    return this.getLanguage() === Language.ARABIC;
  }
  changeLanguage() {
    const newLang = this.isArabic()
      ? Language.ENGLISH
      : Language.ARABIC;
    this.setLanguage(newLang);
  }
}
