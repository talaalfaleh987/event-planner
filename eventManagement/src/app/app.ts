import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from './enums/language.enum';
import { TranslateService } from '@ngx-translate/core';
import { PieChartType } from './enums/charts.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('eventManagement');

  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.setFallbackLang(Language.ARABIC);
    this.translate.use(Language.ARABIC);
  }
}
