import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateButton } from './components/translate-button/translate-button';
import { Language } from './enums/language.enum';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('eventManagement');
  
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.setFallbackLang(Language.ARABIC);
    this.translate.use(Language.ARABIC);
  }
}
